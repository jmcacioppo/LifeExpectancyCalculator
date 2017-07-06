import {inject} from 'aurelia-framework';
import {Router} from 'aurelia-router';
import {User} from '../services/user';
import {StateData} from '../services/data/stateData';
import * as ionRangeSlider from "ion-rangeslider";
import {Slider} from '../utilities/slider';
import {CalculateResults} from '../utilities/calculations/calculateResults';

@inject(Router, User, StateData, Slider, CalculateResults)
export class personalinfo {
    currentCountyArray = [];

    constructor(router, user, stateData, slider, calculateResults) {
        this.slider = slider;
        this.router = router;
        this.user = user;
        this.stateData = stateData;
        this.calculateResults = calculateResults;
    }

    gender(person) {
        person.checkgender = !person.checkgender;
        person.gender = person.checkgender ? 'Male' : 'Female';
        console.log(person);
    }

    checkspouse() {
        this.user.clientPersonalInfo.checkspouse = !this.user.clientPersonalInfo.checkspouse;
    }

    //======================LIFE EXPECTANCY FROM STATES/COUNTIES==================
    //This method retrieves all of the counties from the client's current state
    checkState(person) {
        var state = person.state;
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
        else person.county = "Please Select";
    }

    //This method checks the current client's life expectancy
    checkLifeExpectancy(person) {
        if(person.county != "Please Select") {
            var state = person.state;
            var countyWithLifeArrays = this.stateData.stateToCountyMap.get(state).split(',');
            countyWithLifeArrays.forEach(function (data) {
                var currentCountyInfo = data.split(":");
                //Life expectancy of male is index 2, life expectancy of female is index 1
                var lifeExpectancy =  person.checkgender ? currentCountyInfo[2] : currentCountyInfo[1];
                //If county name is found in array, then get life expectancy
                if(currentCountyInfo[0].indexOf(person.county) != -1) {
                    person.countyLifeExpectancy =  person.checkgender ? currentCountyInfo[1] : currentCountyInfo[2];
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
        //Get life expectancy based on age, gender, and ethnicity
        await this.calculateResults.getLifeTableData(this.user.clientPersonalInfo);
        this.calculateResults.calculateEducation(this.user.clientPersonalInfo, this.user.clientResults)
        this.calculateResults.addExpectancies(this.user.clientResults);

        console.log("=======CLIENT=======");
        console.log(this.user.clientPersonalInfo);
        console.log(this.user.clientResults);

        if(this.user.clientPersonalInfo.checkspouse){
            await this.calculateResults.getLifeTableData(this.user.spousePersonalInfo);
            this.calculateResults.calculateEducation(this.user.spousePersonalInfo, this.user.spouseResults)
            this.calculateResults.addExpectancies(this.user.spouseResults);
        
            console.log("=======SPOUSE=======");
            console.log(this.user.spousePersonalInfo);
            console.log(this.user.spouseResults);
        } 
        
        this.router.navigate('#/results');  
    }

    attached() {
        this.slider.createAgeSlider();
    }
}