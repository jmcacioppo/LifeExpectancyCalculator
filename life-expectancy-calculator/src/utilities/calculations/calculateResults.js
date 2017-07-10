import {inject} from 'aurelia-framework';
import {HttpClient, json} from 'aurelia-fetch-client';
import {User} from '../../services/user';

@inject(HttpClient, User)
export class CalculateResults {
    httpClient;

    constructor(httpClient, user) {
        this.httpClient = httpClient;
        this.user = user;
    }

    //Gets the life table based on the users race and gender
    async getLifeTableData(client, clientResults, spouse, spouseResults) {
        let clientEthnicityExpectancy = await this.httpClient.fetch('/api/life-table/' + client.race.toLowerCase() + '-' + client.gender.toLowerCase() + '.json');
        let clientResultsData = await clientEthnicityExpectancy.json();
        this.setUserExpectedAge(clientResultsData, client);

        var spouseResultsData;
        if(client.checkspouse) {
            let spouseEthnicityExpectancy = await this.httpClient.fetch('/api/life-table/' + spouse.race.toLowerCase() + '-' + spouse.gender.toLowerCase() + '.json');
            spouseResultsData = await spouseEthnicityExpectancy.json();
            this.setUserExpectedAge(spouseResultsData, spouse);
        }

        this.getTestTuples(clientResultsData, client, clientResults,
            spouseResultsData, spouse, spouseResults);
    }

    //Iterates through the json object to determine the user's expected age
    setUserExpectedAge(data, person) {
        data.forEach(function(value) {
            //If the user is currently the age in the json object, then the current age is set
            var currentAgeArray = [];
            currentAgeArray[0] = parseInt(value.Age.slice(0, 2));
            currentAgeArray[1] = parseInt(value.Age.slice(3, 5));
            if((currentAgeArray[0] === person.age || currentAgeArray[1] === person.age) && person.age <= currentAgeArray[0]) {
                person.expectedYearsLeft = parseInt(value.Number);
            }
        });
    }

    //Education calculation
    calculateEducation(person, results) {
        var educationLifeExpectancy = 0;
        var education = person.education;
        if(education.indexOf("Didn't") !== -1) { //If didn't complete high school
            if(person.gender == 'Male' || person.gender == 'male') educationLifeExpectancy -= 2;
            else if(person.gender == 'Female') educationLifeExpectancy -= 0.4;
        } 
        if(education.indexOf("trade school") !== -1) { //If graduated high school
            if(person.gender == 'Male' || person.gender == 'male') educationLifeExpectancy -= 0.4;
            else if(person.gender == 'Female') educationLifeExpectancy += 0.25;
        } 
        if(education.indexOf("college") !== -1) { //If graduated college or more
            if(person.gender == 'Male' || person.gender == 'male') educationLifeExpectancy += 3;
            else if(person.gender == 'Female') educationLifeExpectancy += 1.9;
        } 

        results.education = educationLifeExpectancy;
    }

    //Add years from expectancies
    addExpectancies(personResults) {
        personResults.overallLifeExpectancy = 0;
        //Personal Info Factors
        personResults.overallLifeExpectancy += personResults.education;
        personResults.overallLifeExpectancy += personResults.marital;
        
        //MyHealth Factors
        personResults.overallLifeExpectancy += personResults.exercise;
        personResults.overallLifeExpectancy += personResults.smoker;
        personResults.overallLifeExpectancy += personResults.healthrank;
        personResults.overallLifeExpectancy += personResults.diabetes;
        personResults.overallLifeExpectancy += personResults.mental;
        personResults.overallLifeExpectancy += personResults.parentAges;
        personResults.overallLifeExpectancy += personResults.alcohol;
        personResults.overallLifeExpectancy += personResults.county;

        //Occupation Factors
        personResults.overallLifeExpectancy += personResults.income;
    }

    getPercent(initialValue, currentValue, pastValue, percentage) {
        if(currentValue < initialValue * percentage) {
            var difference = pastValue - currentValue;
            var number = (pastValue - initialValue * percentage) / difference;
            return number;
        }
        else return false;
    }
    
    //Gets test tuples for chart data
    getTestTuples(clientResultsData, client, clientResults,
            spouseResultsData, spouse, spouseResults) {
        
        //SUBTRACT DIABETES YEARS
        function calculateDiabetes(person, age, personResults) {
            if(person.checkdiabetes) {
                if(age < 70) personResults.overallLifeExpectancy -= 5.4;
                else if(age >= 70 && age < 80) personResults.overallLifeExpectancy -= 4.0;
                else if(age >= 80 && age < 90) personResults.overallLifeExpectancy -= 2.5;
                else if(age >= 90 && age < 100) personResults.overallLifeExpectancy -= 1.0;
                else if(age >= 100) personResults.overallLifeExpectancy -= 0;
            } 
        }

        var clientTuples = [];
        var clientTableAge = [];
        var clientTableValue = [];
        var self = this;
        var age, more, less, difference, number, check90, check75, check50, check25, check10;
        var self = this;

        check90 = true; 
        check75 = true; 
        check50 = true; 
        check25 = true; 
        check10 = true;

        //CLIENT
        clientResultsData.forEach(function(value, i) {
            if(parseInt(value.Age) >= client.age) {
                var initialValue = parseInt(clientResultsData[client.age].Number);
                var tempValueNumber = parseInt(value.Number);

                //OCCUPATION
                if(parseInt(value.Age) <= 67) value.Number = parseInt(value.Number) - self.user.clientOccupation.occupationChangeInLifeExpectancy;
                
                //MARITAL STATUS
                if(client.gender == 'male' || client.gender == 'Male') {
                    if(parseInt(value.Age) >= 28 && parseInt(value.Age) <= 70) {
                        difference = parseInt(clientResultsData[i-1].Number) - parseInt(clientResultsData[i].Number);
                        if(client.maritalStatus == 'Single/Never Married') value.Number -= difference * .32; //Always Single
                        else if(client.maritalStatus == 'Married/Cohabitated') value.Number += difference * .15; //Years of marriage
                        else if(client.maritalStatus == 'Widowed') value.Number -= difference * .32; //Years after passing
                        else if(client.maritalStatus == 'Divorced') value.Number -= difference * .32; //Years after divorce
                    }
                }
                else if(client.gender == 'Female') {
                    if(parseInt(value.Age) >= 25 && parseInt(value.Age) <= 70) {
                        difference = parseInt(clientResultsData[i-1].Number) - parseInt(clientResultsData[i].Number);
                        if(client.maritalStatus == 'Single/Never Married') value.Number -= difference * .32; //Always Single
                        else if(client.maritalStatus == 'Married/Cohabitated') value.Number += difference * .15; //Years of marriage
                        else if(client.maritalStatus == 'Widowed') value.Number -= difference * .32; //Years after passing
                        else if(client.maritalStatus == 'Divorced') value.Number -= difference * .32; //Years after divorce
                    }
                }

                //GET PERCENTILES
                if(i > 0) {
                    age = clientResultsData[i-1].Age;
                    less = parseFloat(clientResultsData[i].Number);
                    more = parseFloat(clientResultsData[i-1].Number);
                    
                    if(check90) {
                        if(self.getPercent(initialValue, less, more, .90) != false) {
                            number = self.getPercent(initialValue, less, more, .90);
                            clientTableAge.push((parseInt(age) + number).toFixed(2) + parseFloat(clientResults.overallLifeExpectancy));
                            clientTableValue.push("90%");
                            check90 = false;
                        }
                    }
                    if(check75) {
                        if(self.getPercent(initialValue, less, more, .75) != false) {
                            number = self.getPercent(initialValue, less, more, .75);
                            clientTableAge.push((parseInt(age) + number).toFixed(2) + parseFloat(clientResults.overallLifeExpectancy));
                            clientTableValue.push("75%");
                            check75 = false;
                        }
                    }
                    if(check50) {
                        if(self.getPercent(initialValue, less, more, .50) != false) {
                            number = self.getPercent(initialValue, less, more, .50);
                            clientTableAge.push((parseInt(age) + number).toFixed(2) + parseFloat(clientResults.overallLifeExpectancy));
                            clientTableValue.push("50%");

                            calculateDiabetes(self.user.clientMyHealth, parseInt(age) + number, clientResults);
                            clientResults.finalLifeExpectancy = (parseInt(age) + number).toFixed(2);
                            check50 = false;
                        }
                    }
                    if(check25) {
                        if(self.getPercent(initialValue, less, more, .25) != false) {
                            number = self.getPercent(initialValue, less, more, .25);
                            clientTableAge.push((parseInt(age) + number).toFixed(2) + parseFloat(clientResults.overallLifeExpectancy));
                            clientTableValue.push("25%");
                            check25 = false;
                        }
                    }
                    if(check10) {
                        if(self.getPercent(initialValue, less, more, .10) != false) {
                            number = self.getPercent(initialValue, less, more, .10);
                            clientTableAge.push((parseInt(age) + number).toFixed(2) + parseFloat(clientResults.overallLifeExpectancy));
                            clientTableValue.push("10%");
                            check10 = false;
                        }
                    }
                }

                clientTuples.push([parseInt(value.Age), value.Number]);
                value.Number = tempValueNumber;
            } //PAST MARITAL STATUS 
            else if(parseInt(value.Age) < client.age) {
                if(client.gender == 'male' || client.gender == 'Male') {
                    if(parseInt(value.Age) >= 28 && parseInt(value.Age) <= 70) {
                        difference = parseInt(clientResultsData[i-1].Number) - parseInt(clientResultsData[i].Number);
                        var ageAtMarriage = parseInt(value.Age) - client.yearsOfMarriage;

                        if(client.maritalStatus == 'Single/Never Married') value.Number -= difference * .32; //Always Single

                        else if(client.maritalStatus == 'Married/Cohabitated') {
                            if(ageAtMarriage > parseInt(value.Age)) value.Number -= difference * .32; //Years they were single
                            else value.Number += difference * .15; //Years of marriage
                        }

                        else if(client.maritalStatus == 'Widowed') {
                            ageAtMarriage -= client.yearsSinceSpousePassing;
                            var ageAtPassing = parseInt(value.Age) - client.yearsSinceSpousePassing;

                            if(ageAtMarriage - 28 > 0) value.Number -= difference * .32; //Years they were single before marriage
                            else if(ageAtMarriage < ageAtPassing) value.Number += difference * .15; //Years of Marriage
                            else {
                                if(parseInt(value.Age) == ageAtPassing) {
                                    value.Number -= difference * .32;
                                    value.Number -= difference * .66; //Year of passing
                                }
                                else if(parseInt(value.Age) == ageAtPassing + 1) {
                                    value.Number -= difference * .32;
                                    value.Number -= difference * .30; //Year after the year of passing
                                }
                                else value.Number -= difference * .32; //Years after passing
                            }
                        }

                        else if(client.maritalStatus == 'Divorced') {
                            ageAtMarriage -= client.yearsOfDivorce;
                            var ageAtDivorce = parseInt(value.Age) - client.yearsOfDivorce;

                            if(ageAtMarriage - 28 > 0) value.Number -= difference * .32; //Years they were single before marriage
                            else if(ageAtMarriage < ageAtDivorce) value.Number += difference * .15; //Years of Marriage
                            else value.Number -= difference * .32; //Years after divorce
                        }
                    }
                }
                else if(client.gender == 'Female') {
                    if(parseInt(value.Age) >= 25 && parseInt(value.Age) <= 70) {
                        difference = parseInt(clientResultsData[i-1].Number) - parseInt(clientResultsData[i].Number);
                        var ageAtMarriage = parseInt(value.Age) - client.yearsOfMarriage;

                        if(client.maritalStatus == 'Single/Never Married') value.Number -= difference * .32; //Always Single

                        else if(client.maritalStatus == 'Married/Cohabitated') {
                            if(ageAtMarriage > parseInt(value.Age)) value.Number -= difference * .32; //Years they were single
                            else value.Number += difference * .15; //Years of marriage
                        }

                        else if(client.maritalStatus == 'Widowed') {
                            ageAtMarriage -= client.yearsSinceSpousePassing;
                            var ageAtPassing = parseInt(value.Age) - client.yearsSinceSpousePassing;

                            if(ageAtMarriage - 25 > 0) value.Number -= difference * .32; //Years they were single before marriage
                            else if(ageAtMarriage < ageAtPassing) value.Number += difference * .15; //Years of Marriage
                            else {
                                if(parseInt(value.Age) == ageAtPassing) {
                                    value.Number -= difference * .32;
                                    value.Number -= difference * .66; //Year of passing
                                }
                                else if(parseInt(value.Age) == ageAtPassing + 1) {
                                    value.Number -= difference * .32;
                                    value.Number -= difference * .30; //Year after the year of passing
                                }
                                else value.Number -= difference * .32; //Years after passing
                            }
                        }

                        else if(client.maritalStatus == 'Divorced') {
                            ageAtMarriage -= client.yearsOfDivorce;
                            var ageAtDivorce = parseInt(value.Age) - client.yearsOfDivorce;

                            if(ageAtMarriage - 25 > 0) value.Number -= difference * .32; //Years they were single before marriage
                            else if(ageAtMarriage < ageAtDivorce) value.Number += difference * .15; //Years of Marriage
                            else value.Number -= difference * .32; //Years after divorce
                        }
                    }
                }
            }
        });

        var spouseTuples = [];
        var spouseTableAge = [];
        var spouseTableValue = [];

        check90 = true; 
        check75 = true; 
        check50 = true; 
        check25 = true; 
        check10 = true;
        //CO-CLIENT
        if(client.checkspouse) {
            spouseResultsData.forEach(function(value, i) {
                if(parseInt(value.Age) >= spouse.age) {
                    var initialValue = parseInt(spouseResultsData[spouse.age].Number);
                    var tempValueNumber = parseInt(value.Number);

                    //OCCUPATION
                    if(parseInt(value.Age) <= 67) value.Number = parseInt(value.Number) - self.user.spouseOccupation.occupationChangeInLifeExpectancy;
                    
                    //MARITAL STATUS
                    if(spouse.gender == 'male' || spouse.gender == 'Male') {
                        if(parseInt(value.Age) >= 28 && parseInt(value.Age) <= 70) {
                            difference = parseInt(spouseResultsData[i-1].Number) - parseInt(spouseResultsData[i].Number);
                            if(spouse.maritalStatus == 'Single/Never Married') value.Number -= difference * .32; //Always Single
                            else if(spouse.maritalStatus == 'Married/Cohabitated') value.Number += difference * .15; //Years of marriage
                            else if(spouse.maritalStatus == 'Widowed') value.Number -= difference * .32; //Years after passing
                            else if(spouse.maritalStatus == 'Divorced') value.Number -= difference * .32; //Years after divorce
                        }
                    }
                    else if(spouse.gender == 'Female') {
                        if(parseInt(value.Age) >= 25 && parseInt(value.Age) <= 70) {
                            difference = parseInt(spouseResultsData[i-1].Number) - parseInt(spouseResultsData[i].Number);
                            if(spouse.maritalStatus == 'Single/Never Married') value.Number -= difference * .32; //Always Single
                            else if(spouse.maritalStatus == 'Married/Cohabitated') value.Number += difference * .15; //Years of marriage
                            else if(spouse.maritalStatus == 'Widowed') value.Number -= difference * .32; //Years after passing
                            else if(spouse.maritalStatus == 'Divorced') value.Number -= difference * .32; //Years after divorce
                        }
                    }
                    
                    //GET PERCENTILES
                    if(i > 0) {
                        age = spouseResultsData[i-1].Age;
                        less = parseFloat(spouseResultsData[i].Number);
                        more = parseFloat(spouseResultsData[i-1].Number);
                        
                        if(check90) {
                            if(self.getPercent(initialValue, less, more, .90) != false) {
                                number = self.getPercent(initialValue, less, more, .90);
                                spouseTableAge.push((parseInt(age) + number).toFixed(2) + parseFloat(spouseResults.overallLifeExpectancy));
                                spouseTableValue.push("90%");
                                check90 = false;
                            }
                        }
                        if(check75) {
                            if(self.getPercent(initialValue, less, more, .75) != false) {
                                number = self.getPercent(initialValue, less, more, .75);
                                spouseTableAge.push((parseInt(age) + number).toFixed(2) + parseFloat(spouseResults.overallLifeExpectancy));
                                spouseTableValue.push("75%");
                                check75 = false;
                            }
                        }
                        if(check50) {
                            if(self.getPercent(initialValue, less, more, .50) != false) {
                                number = self.getPercent(initialValue, less, more, .50);
                                spouseTableAge.push((parseInt(age) + number).toFixed(2) + parseFloat(spouseResults.overallLifeExpectancy));
                                spouseTableValue.push("50%");

                                calculateDiabetes(self.user.spouseMyHealth, parseInt(age) + number, spouseResults);
                                spouseResults.finalLifeExpectancy = (parseInt(age) + number).toFixed(2);
                                check50 = false;
                            }
                        }
                        if(check25) {
                            if(self.getPercent(initialValue, less, more, .25) != false) {
                                number = self.getPercent(initialValue, less, more, .25);
                                spouseTableAge.push((parseInt(age) + number).toFixed(2) + parseFloat(spouseResults.overallLifeExpectancy));
                                spouseTableValue.push("25%");
                                check25 = false;
                            }
                        }
                        if(check10) {
                            if(self.getPercent(initialValue, less, more, .10) != false) {
                                number = self.getPercent(initialValue, less, more, .10);
                                spouseTableAge.push((parseInt(age) + number).toFixed(2) + parseFloat(spouseResults.overallLifeExpectancy));
                                spouseTableValue.push("10%");
                                check10 = false;
                            }
                        }
                    }

                    spouseTuples.push([parseInt(value.Age), value.Number]);
                    value.Number = tempValueNumber;
                } //PAST MARITAL STATUS 
                else if(parseInt(value.Age) < spouse.age) {
                    if(spouse.gender == 'male' || spouse.gender == 'Male') {
                        if(parseInt(value.Age) >= 28 && parseInt(value.Age) <= 70) {
                            difference = parseInt(spouseResultsData[i-1].Number) - parseInt(spouseResultsData[i].Number);
                            var ageAtMarriage = parseInt(value.Age) - spouse.yearsOfMarriage;

                            if(spouse.maritalStatus == 'Single/Never Married') value.Number -= difference * .32; //Always Single

                            else if(spouse.maritalStatus == 'Married/Cohabitated') {
                                if(ageAtMarriage > parseInt(value.Age)) value.Number -= difference * .32; //Years they were single
                                else value.Number += difference * .15; //Years of marriage
                            }

                            else if(spouse.maritalStatus == 'Widowed') {
                                ageAtMarriage -= spouse.yearsSinceSpousePassing;
                                var ageAtPassing = parseInt(value.Age) - spouse.yearsSinceSpousePassing;

                                if(ageAtMarriage - 28 > 0) value.Number -= difference * .32; //Years they were single before marriage
                                else if(ageAtMarriage < ageAtPassing) value.Number += difference * .15; //Years of Marriage
                                else {
                                    if(parseInt(value.Age) == ageAtPassing) {
                                        value.Number -= difference * .32;
                                        value.Number -= difference * .66; //Year of passing
                                    }
                                    else if(parseInt(value.Age) == ageAtPassing + 1) {
                                        value.Number -= difference * .32;
                                        value.Number -= difference * .30; //Year after the year of passing
                                    }
                                    else value.Number -= difference * .32; //Years after passing
                                }
                            }

                            else if(spouse.maritalStatus == 'Divorced') {
                                ageAtMarriage -= spouse.yearsOfDivorce;
                                var ageAtDivorce = parseInt(value.Age) - spouse.yearsOfDivorce;

                                if(ageAtMarriage - 28 > 0) value.Number -= difference * .32; //Years they were single before marriage
                                else if(ageAtMarriage < ageAtDivorce) value.Number += difference * .15; //Years of Marriage
                                else value.Number -= difference * .32; //Years after divorce
                            }
                        }
                    }
                    else if(spouse.gender == 'Female') {
                        if(parseInt(value.Age) >= 25 && parseInt(value.Age) <= 70) {
                            difference = parseInt(spouseResultsData[i-1].Number) - parseInt(spouseResultsData[i].Number);
                            var ageAtMarriage = parseInt(value.Age) - spouse.yearsOfMarriage;

                            if(spouse.maritalStatus == 'Single/Never Married') value.Number -= difference * .32; //Always Single

                            else if(spouse.maritalStatus == 'Married/Cohabitated') {
                                if(ageAtMarriage > parseInt(value.Age)) value.Number -= difference * .32; //Years they were single
                                else value.Number += difference * .15; //Years of marriage
                            }

                            else if(spouse.maritalStatus == 'Widowed') {
                                ageAtMarriage -= spouse.yearsSinceSpousePassing;
                                var ageAtPassing = parseInt(value.Age) - spouse.yearsSinceSpousePassing;

                                if(ageAtMarriage - 25 > 0) value.Number -= difference * .32; //Years they were single before marriage
                                else if(ageAtMarriage < ageAtPassing) value.Number += difference * .15; //Years of Marriage
                                else {
                                    if(parseInt(value.Age) == ageAtPassing) {
                                        value.Number -= difference * .32;
                                        value.Number -= difference * .66; //Year of passing
                                    }
                                    else if(parseInt(value.Age) == ageAtPassing + 1) {
                                        value.Number -= difference * .32;
                                        value.Number -= difference * .30; //Year after the year of passing
                                    }
                                    else value.Number -= difference * .32; //Years after passing
                                }
                            }

                            else if(spouse.maritalStatus == 'Divorced') {
                                ageAtMarriage -= spouse.yearsOfDivorce;
                                var ageAtDivorce = parseInt(value.Age) - spouse.yearsOfDivorce;

                                if(ageAtMarriage - 25 > 0) value.Number -= difference * .32; //Years they were single before marriage
                                else if(ageAtMarriage < ageAtDivorce) value.Number += difference * .15; //Years of Marriage
                                else value.Number -= difference * .32; //Years after divorce
                            }
                        }
                    }
                }
            });
        }

        var averageTuples = [];
        var averageTableAge = [];
        var averageTableValue = [];

        check90 = true; 
        check75 = true; 
        check50 = true; 
        check25 = true; 
        check10 = true;

        //AVERAGE CLIENT
        clientResultsData.forEach(function(value, i) {
            if(parseInt(value.Age) >= client.age) {
                var initialValue = parseInt(clientResultsData[client.age].Number);

                //GET PERCENTILES
                if(i > 0) {
                    age = clientResultsData[i-1].Age;
                    less = parseFloat(clientResultsData[i].Number);
                    more = parseFloat(clientResultsData[i-1].Number);
                    
                    if(check90) {
                        if(self.getPercent(initialValue, less, more, .90) != false) {
                            number = self.getPercent(initialValue, less, more, .90);
                            averageTableAge.push((parseInt(age) + number).toFixed(2));
                            averageTableValue.push("90%");
                            check90 = false;
                        }
                    }
                    if(check75) {
                        if(self.getPercent(initialValue, less, more, .75) != false) {
                            number = self.getPercent(initialValue, less, more, .75);
                            averageTableAge.push((parseInt(age) + number).toFixed(2));
                            averageTableValue.push("75%");
                            check75 = false;
                        }
                    }
                    if(check50) {
                        if(self.getPercent(initialValue, less, more, .50) != false) {
                            number = self.getPercent(initialValue, less, more, .50);
                            averageTableAge.push((parseInt(age) + number).toFixed(2));
                            averageTableValue.push("50%");

                            calculateDiabetes(self.user.clientMyHealth, parseInt(age) + number, clientResults);
                            clientResults.finalLifeExpectancy = (parseInt(age) + number).toFixed(2);
                            check50 = false;
                        }
                    }
                    if(check25) {
                        if(self.getPercent(initialValue, less, more, .25) != false) {
                            number = self.getPercent(initialValue, less, more, .25);
                            averageTableAge.push((parseInt(age) + number).toFixed(2));
                            averageTableValue.push("25%");
                            check25 = false;
                        }
                    }
                    if(check10) {
                        if(self.getPercent(initialValue, less, more, .10) != false) {
                            number = self.getPercent(initialValue, less, more, .10);
                            averageTableAge.push((parseInt(age) + number).toFixed(2));
                            averageTableValue.push("10%");
                            check10 = false;
                        }
                    }
                }

                averageTuples.push([parseInt(value.Age), value.Number]);
            }
        });


        var spouseAverageTuples = [];
        var spouseAverageTableAge = [];
        var spouseAverageTableValue = [];

        check90 = true; 
        check75 = true; 
        check50 = true; 
        check25 = true; 
        check10 = true;

        //AVERAGE SPOUSE
        if(client.checkspouse) {
            spouseResultsData.forEach(function(value, i) {
                if(parseInt(value.Age) >= client.age) {
                    var initialValue = parseInt(spouseResultsData[spouse.age].Number);

                    //GET PERCENTILES
                    if(i > 0) {
                        age = spouseResultsData[i-1].Age;
                        less = parseFloat(spouseResultsData[i].Number);
                        more = parseFloat(spouseResultsData[i-1].Number);
                        
                        if(check90) {
                            if(self.getPercent(initialValue, less, more, .90) != false) {
                                number = self.getPercent(initialValue, less, more, .90);
                                spouseAverageTableAge.push((parseInt(age) + number).toFixed(2));
                                spouseAverageTableValue.push("90%");
                                check90 = false;
                            }
                        }
                        if(check75) {
                            if(self.getPercent(initialValue, less, more, .75) != false) {
                                number = self.getPercent(initialValue, less, more, .75);
                                spouseAverageTableAge.push((parseInt(age) + number).toFixed(2));
                                spouseAverageTableValue.push("75%");
                                check75 = false;
                            }
                        }
                        if(check50) {
                            if(self.getPercent(initialValue, less, more, .50) != false) {
                                number = self.getPercent(initialValue, less, more, .50);
                                spouseAverageTableAge.push((parseInt(age) + number).toFixed(2));
                                spouseAverageTableValue.push("50%");

                                calculateDiabetes(self.user.spouseMyHealth, parseInt(age) + number, spouseResults);
                                spouseResults.finalLifeExpectancy = (parseInt(age) + number).toFixed(2);
                                check50 = false;
                            }
                        }
                        if(check25) {
                            if(self.getPercent(initialValue, less, more, .25) != false) {
                                number = self.getPercent(initialValue, less, more, .25);
                                spouseAverageTableAge.push((parseInt(age) + number).toFixed(2));
                                spouseAverageTableValue.push("25%");
                                check25 = false;
                            }
                        }
                        if(check10) {
                            if(self.getPercent(initialValue, less, more, .10) != false) {
                                number = self.getPercent(initialValue, less, more, .10);
                                spouseAverageTableAge.push((parseInt(age) + number).toFixed(2));
                                spouseAverageTableValue.push("10%");
                                check10 = false;
                            }
                        }
                    }

                    spouseAverageTuples.push([parseInt(value.Age), value.Number]);
                }
            });
        }

        //GET TUPLES FOR GRAPH
        clientResults.clientTuples = clientTuples;
        spouseResults.spouseTuples = spouseTuples;
        clientResults.averageTuples = averageTuples;
        spouseResults.spouseAverageTuples = spouseAverageTuples;

        //GET AGES FOR TABLE
        clientResults.clientTableAge = clientTableAge;
        spouseResults.spouseTableAge = spouseTableAge;
        clientResults.averageTableAge = averageTableAge;
        spouseResults.spouseAverageTableAge = spouseAverageTableAge;

        //GET VALUES FOR TABLE
        clientResults.clientTableValue = clientTableValue;
        spouseResults.spouseTableValue = spouseTableValue;
        clientResults.averageTableValue = averageTableValue;
        spouseResults.spouseAverageTableValue = spouseAverageTableValue;
    }

    

    async calculateSpouseDiesEarly(client, clientResults, spouse, spouseResults) {
        let clientEthnicityExpectancy = await this.httpClient.fetch('/api/life-table/' + client.race.toLowerCase() + '-' + client.gender.toLowerCase() + '.json');
        let clientResultsData = await clientEthnicityExpectancy.json();
        var age = client.age + (clientResults.spouseDeath - spouse.age);
        var self = this;
        var check50 = true;

        clientResultsData.forEach(function(value, i) {
            var initialValue = parseInt(clientResultsData[age].Number);
            if(i > 0) {
                var more = clientResultsData[i-1].Number;
                var less = clientResultsData[i].Number;
                if(check50) {
                    if(self.getPercent(initialValue, less, more, .50) != false) check50 = false;
                }
            }
        });
    }
}