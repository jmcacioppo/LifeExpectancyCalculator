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

    //EDUCATION
    education() {
        this.user.clientOccupation.checkEducation = !this.user.clientOccupation.checkEducation;
    }

    spouseeducation() {
        this.user.spouseOccupation.checkEducation = !this.user.spouseOccupation.checkEducation;
    }

    //CONSTRUCTION
    construction() {
        this.user.clientOccupation.checkConstruction = !this.user.clientOccupation.checkConstruction;
    }

    spouseconstruction() {
        this.user.spouseOccupation.checkConstruction = !this.user.spouseOccupation.checkConstruction;
    }

    //EMERGENCY RESPONDING
    emergencyResponding() {
        this.user.clientOccupation.checkEmergencyResponding = !this.user.clientOccupation.checkEmergencyResponding;
    }

    spouseemergencyResponding() {
        this.user.spouseOccupation.checkEmergencyResponding = !this.user.spouseOccupation.checkEmergencyResponding;
    }


    //BUTTONS
    back() {
        this.router.navigate('#/personalinfo');  
    }

    submit() {
        this.router.navigate('#/personalinfo');  
    }
}