import * as ionRangeSlider from "ion-rangeslider";

export class slider {
    constructor() {

    }
    
    createAgeSlider() {
        $("#age").ionRangeSlider({
            grid: true,
            type: "double",
            min: 0,
            max: 100,
            from: 5,
            to: 95,
            step: 1,
            onFinish: (data) => {
                // this.userData.client.retirementAge = data.from;
                // this.userData.client.lifeExpectancy = data.to;
                // this.userData.client.retirementyear = this.userData.client.retirementAge + this.userData.client.yearOfBirth;
            }
        });
    }
}