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
        console.log(this.user.clientMyHealth.heightInInches);
    }

    checkHeightSpouse() {
        console.log(this.user.spouseMyHealth.height);
        var valid = /^[2-9]' ?(?:\d|1[0-1])"?$/.test(this.user.spouseMyHealth.height);
        this.validHeightSpouse = !valid;
        this.heightErrorSpouse = valid ? "" : "has-error";
        if(valid) {
            var feetAndInches = this.user.spouseMyHealth.height.split("'");
            this.user.spouseMyHealth.heightInInches = parseInt(feetAndInches[0]) * 12 + parseInt(feetAndInches[1]);
        }
        console.log(this.user.spouseMyHealth.heightInInches);
    }

    smoking() {
        this.user.clientMyHealth.checksmoking = !this.user.clientMyHealth.checksmoking;
    }

    smokingSpouse() {
        this.user.spouseMyHealth.checksmoking = !this.user.spouseMyHealth.checksmoking;
    }

    back() {
        console.log(this.user.clientMyHealth);
        this.router.navigate('#/personalinfo');  
    }

    submit() {
        this.calculateMyHealth.calculateBMI();
        this.calculateMyHealth.calculateExercise();
        console.log(this.user.clientMyHealth);
        this.router.navigate('#/personalinfo');  
    }
}