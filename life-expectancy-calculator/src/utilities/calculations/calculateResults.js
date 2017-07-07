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
            if(currentAgeArray[0] === person.age || currentAgeArray[1] === person.age) {
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
        //Personal Info Factors
        personResults.overallLifeExpectancy += personResults.education;
        
        //MyHealth Factors
        personResults.overallLifeExpectancy += personResults.exercise;
        personResults.overallLifeExpectancy += personResults.smoker;

        //FamilyHealth Factors


        //Occupation Factors
        personResults.overallLifeExpectancy += personResults.income;
    }
    
    //Gets test tuples for chart data
    getTestTuples(clientResultsData, client, clientResults,
            spouseResultsData, spouse, spouseResults) {
        
        var clientTuples = [];
        var clientTableAge = [];
        var clientTableValue = [];

        var check90 = true; 
        var check75 = true; 
        var check50 = true; 
        var check25 = true; 
        var check10 = true;
        //CLIENT
        clientResultsData.forEach(function(value, i) {
            clientTuples.push([parseInt(value.Age) + client.age + clientResults.overallLifeExpectancy, value.Number]);
            
            if(value.Number < 90000 && check90) {
                clientTableAge.push(clientResultsData[i-1].Age);
                clientTableValue.push(clientResultsData[i-1].Number / 1000 + "%");
                check90 = false;
            }
            else if(value.Number < 75000 && check75) {
                clientTableAge.push(clientResultsData[i-1].Age);
                clientTableValue.push(clientResultsData[i-1].Number / 1000 + "%");
                check75 = false;
            }
            else if(value.Number < 50000 && check50) {
                clientTableAge.push(clientResultsData[i-1].Age);
                clientTableValue.push(clientResultsData[i-1].Number / 1000 + "%");
                check50 = false;
            }
            else if(value.Number < 25000 && check25) {
                clientTableAge.push(clientResultsData[i-1].Age);
                clientTableValue.push(clientResultsData[i-1].Number / 1000 + "%");
                check25 = false;
            }
            else if(value.Number < 10000 && check10) {
                clientTableAge.push(clientResultsData[i-1].Age);
                clientTableValue.push(clientResultsData[i-1].Number / 1000 + "%");
                check10 = false;
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
                spouseTuples.push([parseInt(value.Age) + spouse.age + spouseResults.overallLifeExpectancy, value.Number]);
            
                 if(value.Number < 90000 && check90) {
                    spouseTableAge.push(spouseResultsData[i-1].Age);
                    spouseTableValue.push(spouseResultsData[i-1].Number / 1000 + "%");
                    check90 = false;
                }
                else if(value.Number < 75000 && check75) {
                    spouseTableAge.push(spouseResultsData[i-1].Age);
                    spouseTableValue.push(spouseResultsData[i-1].Number / 1000 + "%");
                    check75 = false;
                }
                else if(value.Number < 50000 && check50) {
                    spouseTableAge.push(spouseResultsData[i-1].Age);
                    spouseTableValue.push(spouseResultsData[i-1].Number / 1000 + "%");
                    check50 = false;
                }
                else if(value.Number < 25000 && check25) {
                    spouseTableAge.push(spouseResultsData[i-1].Age);
                    spouseTableValue.push(spouseResultsData[i-1].Number / 1000 + "%");
                    check25 = false;
                }
                else if(value.Number < 10000 && check10) {
                    spouseTableAge.push(spouseResultsData[i-1].Age);
                    spouseTableValue.push(spouseResultsData[i-1].Number / 1000 + "%");
                    check10 = false;
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
            averageTuples.push([parseInt(value.Age) + client.age, value.Number]);

            if(value.Number < 90000 && check90) {
                averageTableAge.push(clientResultsData[i-1].Age);
                averageTableValue.push(clientResultsData[i-1].Number / 1000 + "%");
                check90 = false;
            }
            else if(value.Number < 75000 && check75) {
                averageTableAge.push(clientResultsData[i-1].Age);
                averageTableValue.push(clientResultsData[i-1].Number / 1000 + "%");
                check75 = false;
            }
            else if(value.Number < 50000 && check50) {
                averageTableAge.push(clientResultsData[i-1].Age);
                averageTableValue.push(clientResultsData[i-1].Number / 1000 + "%");
                check50 = false;
            }
            else if(value.Number < 25000 && check25) {
                averageTableAge.push(clientResultsData[i-1].Age);
                averageTableValue.push(clientResultsData[i-1].Number / 1000 + "%");
                check25 = false;
            }
            else if(value.Number < 10000 && check10) {
                averageTableAge.push(clientResultsData[i-1].Age);
                averageTableValue.push(clientResultsData[i-1].Number / 1000 + "%");
                check10 = false;
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