import {inject} from 'aurelia-framework';
import {HttpClient, json} from 'aurelia-fetch-client';
import {User} from '../services/user';

@inject(HttpClient, User)
export class CalculateResults {
    httpClient;

    constructor(httpClient, user) {
        this.httpClient = httpClient;
        this.user = user;
    }

    //Gets the life table based on the users race and gender
    async getLifeTableData(person) {
        let data = await this.httpClient.fetch('/api/life-table/' + person.race.toLowerCase() + '-' + person.gender.toLowerCase() + '.json');
        let data2 = await data.json();
        this.setUserExpectedAge(data2, person);
        this.getTestTuples(data2, person);
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
                person.ethnicityLifeExpectancy = person.expectedYearsLeft + person.age;
            }
        });
    }

    addExerciseExpectancy(person, personResults) {
        var expectedLife = person.ethnicityLifeExpectancy;
        var addedExercise = person.exerciseLifeExpectancy;
        personResults.overallLifeExpectancy = expectedLife + addedExercise;
    }

    //Averages the life expectancy from the life table and life expectancy county table
    // averageLifeExpectancy(person) {
    //     var averagedLifeExpectancy = ((person.expectedYearsLeft + person.age) + person.ethnicityLifeExpectancy ) / 2;
    //     TODO: Set this variable to new life expectancy if we decide to in future
    //}
    
    //Gets test tuples for chart data
    getTestTuples(jsonData, person) {
        var tempArr = [];
        jsonData.forEach(function(value) {
            tempArr.push([value.Age, 1 - value.Probability]);
        });
        person.testTuples = tempArr;
    }
}