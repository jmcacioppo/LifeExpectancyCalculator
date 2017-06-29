import {inject} from 'aurelia-framework';
import {Router} from 'aurelia-router';
import {User} from '../services/user';
import {StateData} from '../services/stateData';
import * as ionRangeSlider from "ion-rangeslider";


@inject(Router, User, StateData)
export class personalinfo {
    currentCountyArray = [];

    constructor(router, user, stateData) {
        this.router = router;
        this.user = user;
        this.stateData = stateData;
        this.checkState();
    }

    gender() {
        this.user.clientPersonalInfo.checkgender = !this.user.clientPersonalInfo.checkgender;
        this.user.clientPersonalInfo.gender = (this.user.clientPersonalInfo.checkgender) ? 'Male' : 'Female';

        console.log(this.user.clientPersonalInfo);
    }

    checkspouse() {
        this.user.clientPersonalInfo.checkspouse = !this.user.clientPersonalInfo.checkspouse;
    }

    //This method retrieves all of the counties from the clients current state
    checkState() {
        var state = this.user.clientPersonalInfo.state;
        var self = this;
        this.currentCountyArray = [];
        var countyWithLifeArrays = this.stateData.stateToCountyMap.get(state).split(',');
        countyWithLifeArrays.forEach(function (data) {
            var currentCountyInfo = data.split(":");
            self.currentCountyArray.push(currentCountyInfo[0]);
        });
        this.currentCountyArray.pop();
    }

    //This method checks the current clients or co-clients life expectancy
    checkLifeExpectancy() {
        var self = this;
        var state = this.user.clientPersonalInfo.state;
        var countyWithLifeArrays = this.stateData.stateToCountyMap.get(state).split(',');
        countyWithLifeArrays.forEach(function (data) {
            var currentCountyInfo = data.split(":");
            //Life expectancy of male is index 2, life expectancy of female is index 1
            var lifeExpectancy =  self.user.clientPersonalInfo.checkgender ? currentCountyInfo[2] : currentCountyInfo[1];
            //If county name is found in array, then get life expectancy
            if(currentCountyInfo[0].indexOf(self.user.clientPersonalInfo.county) != -1) {
                self.user.clientPersonalInfo.lifeExpectancy =  self.user.clientPersonalInfo.checkgender ? currentCountyInfo[1] : currentCountyInfo[2];
            }
        });
    }

    myhealth() {
        this.router.navigate('#/myhealth');  
    }

    familyhealth() {
        this.router.navigate('#/familyhealth');  
    }

    occupation() {
        this.router.navigate('#/occupation');  
    }

    submit() {
        this.router.navigate('#/results');  
    }

    attached() {
        $("#age").ionRangeSlider({
            grid: true,
            min: 0,
            max: 100,
            from: 30,
            step: 1,
            onFinish: (data) => {
                this.user.clientPersonalInfo.age = data.from;
            }
        });
    }
}