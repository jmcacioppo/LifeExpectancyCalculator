import {inject} from 'aurelia-framework';
import {Router} from 'aurelia-router';
import {User} from '../services/user';
import {CalculateMyHealth} from '../utilities/calculateMyHealth';

@inject(Router, User, CalculateMyHealth)
export class myhealth {
    constructor(router, user, calculateMyHealth) {
        this.calculateMyHealth = calculateMyHealth;
        this.router = router;
        this.user = user;
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