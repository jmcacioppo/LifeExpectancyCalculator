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

    checkState() {
        var state = this.user.clientPersonalInfo.state;
        this.currentCountyArray = [];
        this.currentCountyArray = this.stateData.stateToCountyMap.get(state).split(',');
        this.currentCountyArray.pop();
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