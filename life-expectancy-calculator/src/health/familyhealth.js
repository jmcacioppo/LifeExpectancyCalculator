import {inject} from 'aurelia-framework';
import {Router} from 'aurelia-router';
import {User} from '../services/user';
import {CalculateFamilyHealth} from '../utilities/calculateFamilyHealth'

@inject(Router, User, CalculateFamilyHealth)
export class familyhealth {
    constructor(router, user, calculateFamilyHealth) {
        this.router = router;
        this.user = user;
        this.calculateFamilyHealth = calculateFamilyHealth;
    }

    back() {
        this.router.navigate('#/personalinfo');  
    }

    submit() {
        this.router.navigate('#/personalinfo');  
    }
}