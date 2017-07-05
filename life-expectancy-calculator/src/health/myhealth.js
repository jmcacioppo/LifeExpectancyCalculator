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
    validHeight = false;
    validHeightSpouse = false;
    validBMIClient = false;
    validBMISpouse = false;
    iconClientType = "underweight";
    iconSpouseType = "underweight";

    constructor(router, user, calculateMyHealth) {
        this.calculateMyHealth = calculateMyHealth;
        this.router = router;
        this.user = user;
    }

    //Checks for valid height for the client.
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

    //Checks for valid height for the spouse. 
    checkHeightSpouse() {
        //TODO: DONT LET CLICK SUBMIT WITHOUT PROPER HEIGHT
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

    //This calculates the BMI once both of the height and weight have been entered
    calculateBMI() {
        if(!this.validHeight) {
            this.calculateMyHealth.calculateBMI(this.user.clientMyHealth);
            this.validBMIClient = true;
            this.iconClientType = "./src/health/" + this.setIconType(this.user.clientMyHealth.bmi, false) + ".jpg";
            console.log(this.iconClientType)
        }
        if(!this.validHeightSpouse) {
            this.calculateMyHealth.calculateBMI(this.user.spouseMyHealth);
            this.validBMISpouse = true;
            this.iconSpouseType = this.setIconType(this.user.spouseMyHealth.bmi, true) + ".jpg";
        }
        this.formHeightWeight = "form-height-weight";
    }

    //Determines the icon types give the client/spouse. If client is passed in then, spouse = false.
    setIconType(person, spouse) {
        var currentPerson = spouse ? this.iconClientType : this.iconSpouseType;
        switch(this.user.clientMyHealth.bmi) {
            case person.bmi < 18.5:
                currentPerson = "underweight";
                break;
            case person.bmi >= 18.5 && person.bmi < 25:
                currentPerson = "normal";
                break;
            case person.bmi >= 25 && person.bmi < 30:
                currenPerson = "overweight";
                break;
            case person.bmi > 30 && person.bmi < 35:
                currentPerson = "obese";
                break;
            default:
                currentPerson = "extremely-obese";
                break;
        }
        console.log(currentPerson);
        return currentPerson;
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
        //this.calculateMyHealth.calculateExercise();
        console.log(this.user.clientMyHealth);
        console.log(this.user.spouseMyHealth);
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