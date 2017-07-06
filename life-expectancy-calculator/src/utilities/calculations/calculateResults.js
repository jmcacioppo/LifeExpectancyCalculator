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
    async getLifeTableData(person) {
        let results = await this.httpClient.fetch('/api/life-table/' + person.race.toLowerCase() + '-' + person.gender.toLowerCase() + '.json');
        let resultsData = await results.json();
        this.setUserExpectedAge(resultsData, person);
        this.getTestTuples(resultsData, person);
    }

    //Iterates through the json object to determine the user's expected age
    setUserExpectedAge(data, person) {
        data.forEach(function(value) {
            //If the user is currently the age in the json object, then the current age is set
            var currentAgeArray = [];
            currentAgeArray[0] = parseInt(value.Age.slice(0, 2));
            currentAgeArray[1] = parseInt(value.Age.slice(3, 5));
            if(currentAgeArray[0] === person.age || currentAgeArray[1] === person.age) {
                person.expectedYearsLeft = parseInt(value.ExpectedAge);
                person.ethnicityLifeExpectancy = person.age;
            }
        });
    }

    //Education calculation
    calculateEducation(person, results) {
        console.log(person.education);
    }

    addExpectancies(personResults) {
        //MyHealth Factors
        personResults.overallLifeExpectancy += personResults.exercise;
        personResults.overallLifeExpectancy += personResults.smoker;

        //FamilyHealth Factors


        //Occupation Factors
        personResults.overallLifeExpectancy += personResults.income;
    }
    
    //Gets test tuples for chart data
    getTestTuples(jsonData, person) {
        var tempArr = [];
        var tempArr2 = [];
        var tempArr3 = [];
        
        jsonData.forEach(function(value) {
            tempArr.push([value.Age, value.Number]);
        });
        jsonData.forEach(function(value) {
            tempArr2.push([parseInt(value.Age) + 3, value.Number]);
        });
        jsonData.forEach(function(value) {
            tempArr3.push([parseInt(value.Age) - 5, value.Number]);
        });
        person.testTuples = tempArr;
        person.testTuples2 = tempArr2;
        console.log(tempArr2);
        person.testTuples3 = tempArr3;
        console.log(tempArr3);
    }
}