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
        
        //MyHealth Factors
        personResults.overallLifeExpectancy += personResults.exercise;
        personResults.overallLifeExpectancy += personResults.smoker;
        personResults.overallLifeExpectancy += personResults.diabetes;
        personResults.overallLifeExpectancy += personResults.mental;

        //FamilyHealth Factors
        personResults.overallLifeExpectancy += personResults.parentAges;

        //Occupation Factors
        personResults.overallLifeExpectancy += personResults.income;
    }
    
    //Gets test tuples for chart data
    getTestTuples(clientResultsData, client, clientResults,
            spouseResultsData, spouse, spouseResults) {
        
        //SUBTRACT DIABETES YEARS
        function calculateDiabetes(person, age, personResults) {
            if(person.checkdiabetes) {
                if(age < 70) personResults.overallLifeExpectancy -= 5.4;
                else if(age >= 70) personResults.overallLifeExpectancy -= 4.0;
                else if(age >= 80) personResults.overallLifeExpectancy -= 2.5;
                else if(age >= 90) personResults.overallLifeExpectancy -= 1.0;
                else if(age >= 100) personResults.overallLifeExpectancy -= 0;
            } 
        }

        var clientTuples = [];
        var clientTableAge = [];
        var clientTableValue = [];
        var self = this;
        var age, more, less, difference, number, check90, check75, check50, check25, check10;
        check90 = true; 
        check75 = true; 
        check50 = true; 
        check25 = true; 
        check10 = true;
        //CLIENT
        clientResultsData.forEach(function(value, i) {
            if(parseInt(value.Age) >= client.age) {
                // var tempValueNumber = parseInt(value.Number);
                if(parseInt(value.Age) <= 67) 
                    value.Number = parseInt(value.Number) - self.user.clientOccupation.occupationChangeInLifeExpectancy;
                if(value.Number < 90000 && check90) {
                    age = clientResultsData[i-1].Age;
                    more = clientResultsData[i].Number;
                    less = clientResultsData[i-1].Number;
                    difference = more - less;
                    number = (more - 90000) / difference;

                    clientTableAge.push((parseInt(age) + number).toFixed(2));
                    clientTableValue.push("90%");
                    check90 = false;
                }
                else if(value.Number < 75000 && check75) {
                    age = clientResultsData[i-1].Age;
                    more = clientResultsData[i].Number;
                    less = clientResultsData[i-1].Number;
                    difference = more - less;
                    number = (more - 75000) / difference;

                    clientTableAge.push((parseInt(age) + number).toFixed(2));
                    clientTableValue.push("75%");
                    check75 = false;
                }
                else if(value.Number < 50000 && check50) {
                    age = clientResultsData[i-1].Age;
                    more = clientResultsData[i].Number;
                    less = clientResultsData[i-1].Number;
                    difference = more - less;
                    number = (more - 50000) / difference;

                    clientTableAge.push((parseInt(age) + number).toFixed(2));
                    clientTableValue.push("50%");
                    calculateDiabetes(self.user.clientMyHealth, parseInt(age) + number, clientResults);
                    clientResults.finalLifeExpectancy = (parseInt(age) + number).toFixed(2);

                    check50 = false;
                }
                else if(value.Number < 25000 && check25) {
                    age = clientResultsData[i-1].Age;
                    more = clientResultsData[i].Number;
                    less = clientResultsData[i-1].Number;
                    difference = more - less;
                    number = (more - 25000) / difference;

                    clientTableAge.push((parseInt(age) + number).toFixed(2));
                    clientTableValue.push("25%");
                    check25 = false;
                }
                else if(value.Number < 10000 && check10) {
                    age = clientResultsData[i-1].Age;
                    more = clientResultsData[i].Number;
                    less = clientResultsData[i-1].Number;
                    difference = more - less;
                    number = (more - 10000) / difference;

                    clientTableAge.push((parseInt(age) + number).toFixed(2));
                    clientTableValue.push("10%");
                    check10 = false;
                }

                clientTuples.push([parseInt(value.Age), value.Number]);
                // value.Number = tempValueNumber;
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
                    if(parseInt(value.Age) <= 67) 
                        value.Number = parseInt(value.Number) - self.user.spouseOccupation.occupationChangeInLifeExpectancy;
                    if(value.Number < 90000 && check90) {
                        age = spouseResultsData[i-1].Age;
                        more = spouseResultsData[i].Number;
                        less = spouseResultsData[i-1].Number;
                        difference = more - less;
                        number = (more - 90000) / difference;

                        spouseTableAge.push((parseInt(age) + number).toFixed(2));
                        spouseTableValue.push("90%");
                        check90 = false;
                    }
                    else if(value.Number < 75000 && check75) {
                        age = spouseResultsData[i-1].Age;
                        more = spouseResultsData[i].Number;
                        less = spouseResultsData[i-1].Number;
                        difference = more - less;
                        number = (more - 75000) / difference;

                        spouseTableAge.push((parseInt(age) + number).toFixed(2));
                        spouseTableValue.push("75%");
                        check75 = false;
                    }
                    else if(value.Number < 50000 && check50) {
                        age = spouseResultsData[i-1].Age;
                        more = spouseResultsData[i].Number;
                        less = spouseResultsData[i-1].Number;
                        difference = more - less;
                        number = (more - 50000) / difference;

                        spouseTableAge.push((parseInt(age) + number).toFixed(2));
                        spouseTableValue.push("50%");
                        calculateDiabetes(self.user.spouseMyHealth, parseInt(age) + number, spouseResults);
                        spouseResults.finalLifeExpectancy = (parseInt(age) + number).toFixed(2);

                        check50 = false;
                    }
                    else if(value.Number < 25000 && check25) {
                        age = spouseResultsData[i-1].Age;
                        more = spouseResultsData[i].Number;
                        less = spouseResultsData[i-1].Number;
                        difference = more - less;
                        number = (more - 25000) / difference;

                        spouseTableAge.push((parseInt(age) + number).toFixed(2));
                        spouseTableValue.push("25%");
                        check25 = false;
                    }
                    else if(value.Number < 10000 && check10) {
                        age = spouseResultsData[i-1].Age;
                        more = spouseResultsData[i].Number;
                        less = spouseResultsData[i-1].Number;
                        difference = more - less;
                        number = (more - 10000) / difference;

                        spouseTableAge.push((parseInt(age) + number).toFixed(2));
                        spouseTableValue.push("10%");
                        check10 = false;
                    }

                    spouseTuples.push([parseInt(value.Age), value.Number]);
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
        //AVERAGE
        clientResultsData.forEach(function(value, i) {
            if(parseInt(value.Age) >= client.age) {
                if(value.Number < 90000 && check90) {
                    age = clientResultsData[i-1].Age;
                    more = clientResultsData[i].Number;
                    less = clientResultsData[i-1].Number;
                    difference = more - less;
                    number = (more - 90000) / difference;

                    averageTableAge.push((parseInt(age) + number).toFixed(2));
                    averageTableValue.push("90%");
                    check90 = false;
                }
                else if(value.Number < 75000 && check75) {
                    age = clientResultsData[i-1].Age;
                    more = clientResultsData[i].Number;
                    less = clientResultsData[i-1].Number;
                    difference = more - less;
                    number = (more - 75000) / difference;

                    averageTableAge.push((parseInt(age) + number).toFixed(2));
                    averageTableValue.push("75%");
                    check75 = false;
                }
                else if(value.Number < 50000 && check50) {
                    age = clientResultsData[i-1].Age;
                    more = clientResultsData[i].Number;
                    less = clientResultsData[i-1].Number;
                    difference = more - less;
                    number = (more - 50000) / difference;

                    averageTableAge.push((parseInt(age) + number).toFixed(2));
                    averageTableValue.push("50%");
                    check50 = false;
                }
                else if(value.Number < 25000 && check25) {
                    age = clientResultsData[i-1].Age;
                    more = clientResultsData[i].Number;
                    less = clientResultsData[i-1].Number;
                    difference = more - less;
                    number = (more - 25000) / difference;

                    averageTableAge.push((parseInt(age) + number).toFixed(2));
                    averageTableValue.push("25%");
                    check25 = false;
                }
                else if(value.Number < 10000 && check10) {
                    age = clientResultsData[i-1].Age;
                    more = clientResultsData[i].Number;
                    less = clientResultsData[i-1].Number;
                    difference = more - less;
                    number = (more - 10000) / difference;

                    averageTableAge.push((parseInt(age) + number).toFixed(2));
                    averageTableValue.push("10%");
                    check10 = false;
                }

                averageTuples.push([parseInt(value.Age), value.Number]);
            }
        });

        //GET TUPLES FOR GRAPH
        clientResults.clientTuples = clientTuples;
        spouseResults.spouseTuples = spouseTuples;
        clientResults.averageTuples = averageTuples;

        //GET AGES FOR TABLE
        clientResults.clientTableAge = clientTableAge;
        spouseResults.spouseTableAge = spouseTableAge;
        clientResults.averageTableAge = averageTableAge;

        //GET VALUES FOR TABLE
        clientResults.clientTableValue = clientTableValue;
        spouseResults.spouseTableValue = spouseTableValue;
        clientResults.averageTableValue = averageTableValue;
    }
}