import $ from 'jquery';
import 'jquery-ui-dist';
import {inject} from 'aurelia-framework';
import {Router} from 'aurelia-router';
import {User} from '../services/user';
import {CalculateMyHealth} from '../utilities/calculateMyHealth';

@inject(Router, User, CalculateMyHealth)
export class myhealth {
    heightError = "";
    formHeightWeight = "";

    constructor(router, user, calculateMyHealth) {
        this.calculateMyHealth = calculateMyHealth;
        this.router = router;
        this.user = user;
    }

    //Checks for valid height for the client.
    checkHeight(person) {
        var valid = /^[2-9]' ?(?:\d|1[0-1])"?$/.test(this.user.clientMyHealth.height);
        person.validHeight = valid;
        this.heightError = valid ? "" : "has-error";
        if(valid) {
            var feetAndInches = person.height.split("'");
            person.heightInInches = parseInt(feetAndInches[0]) * 12 + parseInt(feetAndInches[1]);
        }
        //This handles the case where they first entered their weight
        if(person.validWeight) {
            this.calculateBMI(person);
        }
        console.log(person);
    }

    //This calculates the BMI once both of the height and weight have been entered
    calculateBMI(person) {
        console.log(person.validHeight);
        if(person.validHeight) {
            this.calculateMyHealth.calculateBMI(person);
            person.validBMI = true;
            this.setIconType(person, false)
            person.iconType = "./src/health/" + person.iconType + ".jpg";
        }
        person.validWeight = true;
        person.formHeightWeight = true;
    }

    //Determines the icon types give the client/spouse. If client is passed in then, spouse = false.
    setIconType(person, spouse) {
        console.log(person.bmi);
        switch(true) {
            case person.bmi < 18.5:
                person.iconType = "underweight";
                break;
            case person.bmi >= 18.5 && person.bmi < 25:
                person.iconType = "normal";
                break;
            case person.bmi >= 25 && person.bmi < 30:
                person.iconType = "overweight";
                break;
            case person.bmi > 30 && person.bmi < 35:
                person.iconType = "obese";
                break;
            default:
                person.iconType = "extremely-obese";
                break;
        }
        console.log(person.iconType);
        return person;
    }

    smoking() {
        this.user.clientMyHealth.checksmoking = !this.user.clientMyHealth.checksmoking;
    }

    smokingSpouse() {
        this.user.spouseMyHealth.checksmoking = !this.user.spouseMyHealth.checksmoking;
    }
    smoking(person) {
        person.checksmoking = !person.checksmoking;
    }

    back() {
        this.router.navigate('#/personalinfo');  
    }

    submit() {
        this.calculateMyHealth.calculateExercise(this.user.clientMyHealth);
        this.user.clientResults.exercise = this.user.clientMyHealth.exerciseLifeExpectancy;
        console.log(this.user.clientMyHealth);

        if(this.user.clientPersonalInfo.checkspouse) {
            this.calculateMyHealth.calculateBMI(this.user.spouseMyHealth);
            this.calculateMyHealth.calculateExercise(this.user.spouseMyHealth);
            this.user.spouseResults.exercise = this.user.spouseMyHealth.exerciseLifeExpectancy;
            console.log(this.user.spouseMyHealth);
        }
        this.router.navigate('#/personalinfo');  
    }

    //This takes care of setting up the content for the tooltips
    attached() {
        //=====================MY HEALTH TOOLTIPS============================
        $('#height-tooltip').tooltip( {
            content: "Your height is used to calculate your BMI (Body Mass Index)."
        });

        $('#weight-tooltip').tooltip( {
            content: "Your weight is used to calculate your BMI (Body Mass Index)."
        });

        $('#exercise-tooltip').tooltip( {
            content: "For every 1 minute of exercise you get 7 minutes of extra life.<br><b>- National Institute of Health</b>"
        });

        $('#spouse-height-tooltip').tooltip( {
            content: "Your height is used to calculate your BMI (Body Mass Index)."
        });

        $('#spouse-weight-tooltip').tooltip( {
            content: "Your weight is used to calculate your BMI (Body Mass Index)."
        });

        $('#spouse-exercise-tooltip').tooltip( {
            content: "For every 1 minute of exercise you get 7 minutes of extra life.<br><b>- National Institute of Health</b>"
        });
    }
}