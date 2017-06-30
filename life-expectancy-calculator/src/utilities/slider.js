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
            from: 30,
            step: 1,
            onFinish: (data) => {
                this.user.clientPersonalInfo.age = data.from;
            }
        });

        $("#spouseage").ionRangeSlider({
            grid: true,
            min: 0,
            max: 100,
            from: 30,
            step: 1,
            onFinish: (data) => {
                this.user.spousePersonalInfo.age = data.from;
            }
        });
    }
}