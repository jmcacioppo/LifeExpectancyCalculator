import {inject} from 'aurelia-framework';
import {User} from '../services/user';
import * as ionRangeSlider from "ion-rangeslider";
import {CalculateResults} from '../utilities/calculations/calculateResults';

@inject(User, CalculateResults)
export class Slider {
    constructor(user, calculateResults) {
        this.user = user;
        this.calculateResults = calculateResults;
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

    createSpouseDiesSlider() {
        $("#spouseDies").ionRangeSlider({
            grid: true,
            min: this.user.spousePersonalInfo.age,
            max: 100,
            from: this.user.spousePersonalInfo.age + 20,
            step: 1,
            onFinish: (data) => {
                this.user.clientResults.spouseDeath = data.from;
                this.calculateResults.calculateSpouseDiesEarly(this.user.clientPersonalInfo, this.user.clientResults, 
                    this.user.spousePersonalInfo, this.user.spouseResults);
            }
        });
    }
}