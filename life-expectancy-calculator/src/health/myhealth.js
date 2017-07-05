import $ from 'jquery';
import 'jquery-ui-dist';

import {inject} from 'aurelia-framework';
import {Router} from 'aurelia-router';
import {User} from '../services/user';
import {CalculateMyHealth} from '../utilities/calculateMyHealth';

@inject(Router, User, CalculateMyHealth)
export class myhealth {
    heightError = "";
    validHeight = false;
    validHeightSpouse = false;

    constructor(router, user, calculateMyHealth) {
        this.calculateMyHealth = calculateMyHealth;
        this.router = router;
        this.user = user;
    }

    checkHeight() {
        var valid = /^[2-9]' ?(?:\d|1[0-1])"?$/.test(this.user.clientMyHealth.height);
        this.validHeight = !valid;
        this.heightError = valid ? "" : "has-error";
        if(valid) {
            var feetAndInches = this.user.clientMyHealth.height.split("'");
            this.user.clientMyHealth.heightInInches = parseInt(feetAndInches[0]) * 12 + parseInt(feetAndInches[1]);
        }
        //console.log(this.user.clientMyHealth.heightInInches);
    }

    checkHeightSpouse() {
        //DONT LET CLICK SUBMIT WITHOUT PROPER HEIGHT
        console.log(this.user.spouseMyHealth.height);
        var valid = /^[2-9]' ?(?:\d|1[0-1])"?$/.test(this.user.spouseMyHealth.height);
        this.validHeightSpouse = !valid;
        this.heightErrorSpouse = valid ? "" : "has-error";
        if(valid) {
            var feetAndInches = this.user.spouseMyHealth.height.split("'");
            this.user.spouseMyHealth.heightInInches = parseInt(feetAndInches[0]) * 12 + parseInt(feetAndInches[1]);
        }
        //console.log(this.user.spouseMyHealth.heightInInches);
    }

    smoking(person) {
        person.checksmoking = !person.checksmoking;
    }

    back() {
        this.router.navigate('#/personalinfo');  
    }

    submit() {
        this.calculateMyHealth.calculateBMI(this.user.clientMyHealth);
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