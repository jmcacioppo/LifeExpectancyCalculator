import {inject} from 'aurelia-framework';
import {User} from '../services/user';
import * as ionRangeSlider from "ion-rangeslider";

@inject(User)
export class Slider {
    constructor(user) {
        this.user = user;
    }
    
    createAgeSlider() {
        $("#age").ionRangeSlider({
            grid: true,
            min: 0,
            max: 100,
            from: this.user.clientPersonalInfo.age,
            step: 1,
            onFinish: (data) => {
                this.user.clientPersonalInfo.age = data.from;
            }
        });

        $("#spouseage").ionRangeSlider({
            grid: true,
            min: 0,
            max: 100,
            from: this.user.spousePersonalInfo.age,
            step: 1,
            onFinish: (data) => {
                this.user.spousePersonalInfo.age = data.from;
            }
        });
    }

    createLifeExpectancySlider() {
        $('#familyLifeExpectancy').ionRangeSlider({
            grid: true,
            min: 0,
            max: 100,
            from: 70,
            step: 1,
            onFinish: (data) => {
                this.user.clientFamilyHealth.familyLifeExpectancy = data.from;
            }
        });

        $('#spousefamilyLifeExpectancy').ionRangeSlider({
            grid: true,
            min: 0,
            max: 100,
            from: 70,
            step: 1,
            onFinish: (data) => {
                this.user.spouseFamilyHealth.familyLifeExpectancy = data.from;
            }
        });
    }

    
}