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
    }

    //Iterates through the json object to determine the user's expected age
    setUserExpectedAge(data, user) {
        data.forEach(function(value) {
            //If the user is currently the age in the json object, then the current age is set
            var currentAgeArray = value.Age.split("-");
            if(parseInt(currentAgeArray[0]) === user.clientPersonalInfo.age || parseInt(currentAgeArray[1]) === user.clientPersonalInfo.age) {
                console.log(currentAgeArray[0]);
                console.log(currentAgeArray[1]);
                console.log(value.ExpectedAge);
                user.clientPersonalInfo.expectedAge = parseInt(value.ExpectedAge);
            }
        });
        console.log(user.clientPersonalInfo.expectedAge);
    }
}