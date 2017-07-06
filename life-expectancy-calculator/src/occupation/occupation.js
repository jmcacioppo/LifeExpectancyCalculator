import { inject } from 'aurelia-framework';
import { Router } from 'aurelia-router';
import { User } from '../services/user';
import { CalculateOccupation } from '../utilities/calculations/calculateOccupation';

@inject(Router, User, CalculateOccupation)
export class occupation {
    constructor(router, user, calculateOccupation) {
        this.router = router;
        this.user = user;
        this.calculateOccupation = calculateOccupation;
    }

    allowDrop(ev) {
        ev.preventDefault();
    }

    drag(ev) {
        ev.dataTransfer.setData("tonberry", ev.target.id);
        return true;
    }

    drop(ev) {
        ev.preventDefault();
        var data = ev.dataTransfer.getData("tonberry");
        ev.currentTarget.appendChild(document.getElementById(data));
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

    submit(occupationArray) {
        this.calculateOccupation.calculateOccupation(occupationArray);
        this.router.navigate('#/personalinfo');
    }
}