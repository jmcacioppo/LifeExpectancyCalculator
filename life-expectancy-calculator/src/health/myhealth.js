import {inject} from 'aurelia-framework';
import {Router} from 'aurelia-router';
import {User} from '../services/user';
import {CalculateMyHealth} from '../utilities/calculateMyHealth';

@inject(Router, User, CalculateMyHealth)
export class myhealth {
    heightError = "";
    validHeight = false;

    constructor(router, user, calculateMyHealth) {
        this.calculateMyHealth = calculateMyHealth;
        this.router = router;
        this.user = user;
    }

    checkHeight() {
        console.log(this.user.clientMyHealth.height);
        var valid = /^[2-9]' ?(?:\d|1[0-1])"?$/.test(this.user.clientMyHealth.height);
        this.validHeight = !valid;
        this.heightError = valid ? "" : "has-error";
    }

    back() {
        console.log(this.user.clientMyHealth);
        this.router.navigate('#/personalinfo');  
    }

    submit() {
        this.calculateMyHealth.calculateBMI();
        console.log(this.user.clientMyHealth);
        this.router.navigate('#/personalinfo');  
    }
}