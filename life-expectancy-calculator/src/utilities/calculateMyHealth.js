import {inject} from 'aurelia-framework';
import {User} from '../services/user';

@inject(User)
export class CalculateMyHealth {
    constructor(user) {
        this.user = user;
    }

    //this calculates the body mass index(if you're wondering, tweet me @JesseCochran1)
    calculateBMI(person) {
        var metricWeight = person.weight * 0.45;
        var metricHeight = person.heightInInches * 0.025;
        var metricHeightSquared = metricHeight * metricHeight;
        person.bmi = (metricWeight / metricHeightSquared).toPrecision(4);
    }

    //this calculates added/decreased life expectancy based on how many hours of exercise per week
    calculateExercise(person) {
        var exercisePerWeek = person.exercisePerWeek;
        var bmi = person.bmi;
        
        if(exercisePerWeek.indexOf("0") !== -1) {
            person.exerciseLifeExpectancy = 0;
            if(bmi >= 18.5 && bmi < 25) person.exerciseLifeExpectancy -= 4.7;
            else if(bmi >= 25 && bmi < 30) person.exerciseLifeExpectancy -= 3.9;
            else if(bmi >= 30 && bmi < 35) person.exerciseLifeExpectancy -= 5.0;
            else if(bmi >= 35) person.exerciseLifeExpectancy -= 7.2;
        }
        else if(exercisePerWeek.indexOf("Less") !== -1) {
            person.exerciseLifeExpectancy = 1.8;
            if(bmi >= 18.5 && bmi <= 24.9) person.exerciseLifeExpectancy -= 2.4;
            else if(bmi >= 25 && bmi < 30) person.exerciseLifeExpectancy -= 1.8;
            else if(bmi >= 30 && bmi < 35) person.exerciseLifeExpectancy -= 3.2;
            else if(bmi >= 35) person.exerciseLifeExpectancy -= 6.2;
        }
        else if(exercisePerWeek.indexOf("Approximately") !== -1) {
            person.exerciseLifeExpectancy = 3.4;
            if(bmi >= 18.5 && bmi <= 24.9) person.exerciseLifeExpectancy -= 0;
            else if(bmi >= 25 && bmi < 30) person.exerciseLifeExpectancy -= 0;
            else if(bmi >= 30 && bmi < 35) person.exerciseLifeExpectancy -= 1.6;
            else if(bmi >= 35) person.exerciseLifeExpectancy -= 4.5;
        }
        else if(exercisePerWeek.indexOf("More") !== -1) {
            person.exerciseLifeExpectancy = 4.5;
            if(bmi >= 18.5 && bmi <= 24.9) person.exerciseLifeExpectancy -= 0;
            else if(bmi >= 25 && bmi < 30) person.exerciseLifeExpectancy -= 0;
            else if(bmi >= 30 && bmi < 35) person.exerciseLifeExpectancy -= 1.6;
            else if(bmi >= 35) person.exerciseLifeExpectancy -= 4.5;
        }
    }
}