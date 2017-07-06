import {inject} from 'aurelia-framework';
import {Router} from 'aurelia-router';
import {User} from '../services/user';
import {CalculateOccupation} from '../utilities/calculations/calculateOccupation';

@inject(Router, User, CalculateOccupation)
export class occupation {
    constructor(router, user, calculateOccupation) {
        this.router = router;
        this.user = user;
        this.calculateOccupation = calculateOccupation;
    }

    //EDUCATION
    education(person) {
        person.checkEducation = !person.checkEducation;
    }

    //CONSTRUCTION
    construction(person) {
        person.checkConstruction = !person.checkConstruction;
    }

    //EMERGENCY RESPONDING
    emergencyResponding(person) {
        person.checkEmergencyResponding = !person.checkEmergencyResponding;
    }

    //BUTTONS
    back() {
        this.router.navigate('#/personalinfo');  
    }

    submit() {
        this.router.navigate('#/personalinfo');  
    }
}