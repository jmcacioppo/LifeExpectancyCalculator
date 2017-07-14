import {inject} from 'aurelia-framework';
import {Router} from 'aurelia-router';
import {User} from '../services/user';
import {StateData} from '../services/data/stateData';
import * as ionRangeSlider from "ion-rangeslider";
import {Slider} from '../utilities/slider';
import {CalculateResults} from '../utilities/calculations/calculateResults';
import {CalculateOccupation} from '../utilities/calculations/calculateOccupation';
import {OccupationData} from '../services/data/occupationData'

@inject(Router, User, StateData, Slider, CalculateResults, CalculateOccupation, OccupationData)
export class personalinfo {

    constructor(router, user, stateData, slider, calculateResults, calculateOccupation, occupationData) {
        this.slider = slider;
        this.router = router;
        this.user = user;
        this.stateData = stateData;
        this.calculateResults = calculateResults;
        this.calculateOccupation = calculateOccupation;
        this.occupationData = occupationData;
        if(this.occupationData.laborArray.length == 0) 
            calculateOccupation.loadOccupation();
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
            person.currentCountyArray = [];
            state = state.toLowerCase();
            var countyWithLifeArrays = this.stateData.stateToCountyMap.get(state).split(',');
            countyWithLifeArrays.forEach(function (data) {
                var currentCountyInfo = data.split(":");
                person.currentCountyArray.push(currentCountyInfo[0]);
            });
            person.currentCountyArray.pop();
        }
        else person.county = "Please Select";
    }

    //This method checks the current client's life expectancy
    checkLifeExpectancy(person) {
        console.log(person);
        if(person.county != "Please Select") {
            var state = person.state;
            state = state.toLowerCase();
            var countyWithLifeArrays = this.stateData.stateToCountyMap.get(state).split(',');
            countyWithLifeArrays.forEach(function (data) {
                var currentCountyInfo = data.split(":");
                
                //If county name is found in array, then get life expectancy
                if(currentCountyInfo[0].indexOf(person.county.trim().toLowerCase()) != -1) {
                    person.countyLifeExpectancy =  person.checkgender ? currentCountyInfo[2] : currentCountyInfo[1];
                }
            });
        }
    }
    //===================END LIFE EXPECTANCY FROM STATES/COUNTIES==================

    checkMaritalStatus(person) {
        if(person.maritalStatus == "Single/Never Married") {
            person.isSingle = true;
            person.isMarried = false;
            person.isWidowed = false;
            person.isDivorced = false;
        }
        else if(person.maritalStatus == "Married/Cohabitated") {
            person.isMarried = true;
            person.isSingle = false;
            person.isWidowed = false;
            person.isDivorced = false;
        }
        else if(person.maritalStatus == "Widowed") {
            person.isWidowed = true;
            person.isSingle = false;
            person.isMarried = false;
            person.isDivorced = false;
        }
        else if(person.maritalStatus == "Divorced") {
            person.isDivorced = true;
            person.isSingle = false;
            person.isMarried = false;
            person.isWidowed = false;
        }
        else {
            person.isSingle = false;
            person.isMarried = false;
            person.isWidowed = false;
            person.isDivorced = false;
        }
    }

    myhealth() {
        this.router.navigate('#/myhealth');  
    }

    occupation() {
        this.router.navigate('#/occupation');  
    }

    async submit() {
        //Client calculations - results
        if(this.user.clientPersonalInfo.education && this.user.clientPersonalInfo.education !== "Please Select") {
            this.calculateResults.calculateEducation(this.user.clientPersonalInfo, this.user.clientResults);
        }
        this.calculateResults.addExpectancies(this.user.clientResults);
        
        console.log("=======CLIENT=======");
        console.log(this.user.clientPersonalInfo);
        console.log(this.user.clientResults);

        //Spouse calculations - results
        if(this.user.clientPersonalInfo.checkspouse){
            if(this.user.spousePersonalInfo.education && this.user.spousePersonalInfo.education !== "Please Select") {
                this.calculateResults.calculateEducation(this.user.spousePersonalInfo, this.user.spouseResults);
            }
            this.calculateResults.addExpectancies(this.user.spouseResults);

            console.log("=======SPOUSE=======");
            console.log(this.user.spousePersonalInfo);
            console.log(this.user.spouseResults);
        } 

        await this.calculateResults.getLifeTableData(this.user.clientPersonalInfo, this.user.clientResults,
            this.user.spousePersonalInfo, this.user.spouseResults);
        
        this.router.navigate('#/results');  
    }

    attached() {
        this.slider.createAgeSlider();
    }
}