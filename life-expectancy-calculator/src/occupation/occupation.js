import {inject} from 'aurelia-framework';
import {Router} from 'aurelia-router';
import {User} from '../services/user';
import {CalculateOccupation} from '../utilities/calculateOccupation';

@inject(Router, User, CalculateOccupation)
export class occupation {
    constructor(router, user, calculateOccupation) {
        this.router = router;
        this.user = user;
        this.calculateOccupation = calculateOccupation;
    }

    back() {
        this.router.navigate('#/personalinfo');  
    }

    submit() {
        this.router.navigate('#/personalinfo');  
    }
}