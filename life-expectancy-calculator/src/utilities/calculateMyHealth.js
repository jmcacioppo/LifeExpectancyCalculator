import {inject} from 'aurelia-framework';
import {User} from '../services/user';

@inject(User)
export class CalculateMyHealth {
    constructor(user) {
        this.user = user;
    }

    //this calculates the body mass index(if you're wondering, tweet me @JesseCochran1)
    calculateBMI() {
        var metricWeight = this.user.clientMyHealth.weight * 0.45;
        var metricHeight = this.user.clientMyHealth.heightInInches * 0.025;
        var metricHeightSquared = metricHeight * metricHeight;
        this.user.clientMyHealth.bmi = metricWeight / metricHeightSquared;
    }

    //this calculates added/decreased life expectancy based on how many hours of exercise per week
    calculateExercise() {
        var exercisePerWeek = this.user.clientMyHealth.exercisePerWeek;
        if(exercisePerWeek.indexOf("Less") !== -1) {
            this.user.clientMyHealth.exerciseLifeExpectancy = 1.8;
        }
        else if(exercisePerWeek.indexOf("Approximately") !== -1) {
            this.user.clientMyHealth.exerciseLifeExpectancy = 3.4;
        }
        else if(exercisePerWeek.indexOf("More") !== -1) {
            this.user.clientMyHealth.exerciseLifeExpectancy = 4.5;
        }
        else {
            this.user.clientMyHealth.exerciseLifeExpectancy = 0;
        }
    }
}