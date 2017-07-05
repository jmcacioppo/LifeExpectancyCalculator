import {inject} from 'aurelia-framework';
import {Router} from 'aurelia-router';
import {User} from '../services/user';
import {StateData} from '../services/stateData';
import * as ionRangeSlider from "ion-rangeslider";
import {Slider} from '../utilities/slider';
import {CalculateResults} from '../utilities/calculateResults';

@inject(Router, User, StateData, Slider, CalculateResults)
export class personalinfo {
    currentCountyArray = [];

    constructor(router, user, stateData, slider, calculateResults) {
        this.slider = slider;
        this.router = router;
        this.user = user;
        this.stateData = stateData;
        this.calculateResults = calculateResults;
        this.checkState();
    }

    gender() {
        this.user.clientPersonalInfo.checkgender = !this.user.clientPersonalInfo.checkgender;
        this.user.clientPersonalInfo.gender = (this.user.clientPersonalInfo.checkgender) ? 'Male' : 'Female';
        console.log(this.user.clientPersonalInfo);
    }

    spousegender() {
        this.user.spousePersonalInfo.checkgender = !this.user.spousePersonalInfo.checkgender;
        this.user.spousePersonalInfo.gender = (this.user.spousePersonalInfo.checkgender) ? 'Male' : 'Female';
        console.log(this.user.clientPersonalInfo);
        console.log(this.user.spousePersonalInfo);
    }

    checkspouse() {
        this.user.clientPersonalInfo.checkspouse = !this.user.clientPersonalInfo.checkspouse;
    }

    //======================LIFE EXPECTANCY FROM STATES/COUNTIES==================
    //This method retrieves all of the counties from the client's current state
    checkState() {
        var state = this.user.clientPersonalInfo.state;
        if(state != "Please Select") {
            var self = this;
            this.currentCountyArray = [];
            var countyWithLifeArrays = this.stateData.stateToCountyMap.get(state).split(',');
            countyWithLifeArrays.forEach(function (data) {
                var currentCountyInfo = data.split(":");
                self.currentCountyArray.push(currentCountyInfo[0]);
            });
            this.currentCountyArray.pop();
        }
        else this.user.clientPersonalInfo.county = "Please Select";
    }

    //This method checks the current client's life expectancy
    checkLifeExpectancy() {
        if(this.user.clientPersonalInfo.county != "Please Select") {
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
    }

    //This method retrieves all of the counties from the co-client's current state
    checkStateSpouse() {
        var state = this.user.spousePersonalInfo.state;
        if(state != "Please Select") {
            var self = this;
            this.currentCountyArray = [];
            var countyWithLifeArrays = this.stateData.stateToCountyMap.get(state).split(',');
            countyWithLifeArrays.forEach(function (data) {
                var currentCountyInfo = data.split(":");
                self.currentCountyArray.push(currentCountyInfo[0]);
            });
            this.currentCountyArray.pop();
        }
        else this.user.spousePersonalInfo.county = "Please Select";
    }

    //This method checks the current co-client's life expectancy
    checkLifeExpectancySpouse() {
        if(this.user.spousePersonalInfo.county != "Please Select") {
            var self = this;
            var state = this.user.spousePersonalInfo.state;
            var countyWithLifeArrays = this.stateData.stateToCountyMap.get(state).split(',');
            countyWithLifeArrays.forEach(function (data) {
                var currentCountyInfo = data.split(":");
                //Life expectancy of male is index 2, life expectancy of female is index 1
                var lifeExpectancy =  self.user.spousePersonalInfo.checkgender ? currentCountyInfo[2] : currentCountyInfo[1];
                //If county name is found in array, then get life expectancy
                if(currentCountyInfo[0].indexOf(self.user.spousePersonalInfo.county) != -1) {
                    self.user.spousePersonalInfo.lifeExpectancy =  self.user.spousePersonalInfo.checkgender ? currentCountyInfo[1] : currentCountyInfo[2];
                }
            });
        }
    }
    //===================END LIFE EXPECTANCY FROM STATES/COUNTIES==================


    myhealth() {
        this.router.navigate('#/myhealth');  
    }

    familyhealth() {
        this.router.navigate('#/familyhealth');  
    }

    occupation() {
        this.router.navigate('#/occupation');  
    }

    async submit() {
        await this.calculateResults.getLifeTableData(this.user);
        this.calculateResults.addExerciseExpectancy();
        console.log(this.user.clientPersonalInfo);
        console.log(this.user.clientResults);
        this.router.navigate('#/results');  
    }

    attached() {
        this.slider.createAgeSlider();
    }
}