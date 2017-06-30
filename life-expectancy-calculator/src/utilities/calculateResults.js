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
    async getLifeTableData(user) {
        let data = await this.httpClient.fetch('/api/life-table/' + user.clientPersonalInfo.race.toLowerCase() + '-' + user.clientPersonalInfo.gender.toLowerCase() + '.json');
        let data2 = await data.json();
        this.setUserExpectedAge(data2, user);
        this.getTestTuples(data2);
    }

    //Iterates through the json object to determine the user's expected age
    setUserExpectedAge(data, user) {
        data.forEach(function(value) {
            //If the user is currently the age in the json object, then the current age is set
            var currentAgeArray = [];
            currentAgeArray[0] = parseInt(value.Age.slice(0, 2));
            currentAgeArray[1] = parseInt(value.Age.slice(3, 5));
            if(currentAgeArray[0] === user.clientPersonalInfo.age || currentAgeArray[1] === user.clientPersonalInfo.age) {
                user.clientPersonalInfo.expectedYearsLeft = parseInt(value.ExpectedAge);
            }
        });
    }

    //Averages the life expectancy from the life table and life expectancy county table
    averageLifeExpectancy() {
        var averagedLifeExpectancy = ((this.user.clientPersonalInfo.expectedYearsLeft + this.user.clientPersonalInfo.age) + this.user.clientPersonalInfo.ageAndRaceLifeExpectancy ) / 2;
        //TODO: Set this variable to new life expectancy if we decide to in future
    }
    
    //Gets test tuples for chart data
    getTestTuples(jsonData) {
        var self = this;
        var tempArr = [];
        jsonData.forEach(function(value) {
            tempArr.push([value.Age, 1 - value.Probability]);
        });
        this.user.clientPersonalInfo.testTuples = tempArr;
    }
}