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

    //DRAG AND DROP
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

    //INCOME
    income(person) {
        person.checkincome = !person.checkincome;
    }

    //CHECK OCCUPATION TYPE
    checkOccupation(person, occupationName) {
        person.type = occupationName.type;
    }


    //BUTTONS
    back() {
        this.router.navigate('#/personalinfo');
    }

    submit() {
        var check = true;
        if(this.user.clientOccupation.checkincome) {
            if(!isNaN(this.user.clientOccupation.income)) {
                this.calculateOccupation.calculateIncome(this.user.clientOccupation, this.user.clientPersonalInfo.gender, this.user.clientResults);
            }
            else {
                check = false;
                alert('Enter a valid income');
            }
        }
     
        
        if(this.user.clientPersonalInfo.checkspouse) {
            if(this.user.spouseOccupation.checkincome) {
                if(!isNaN(this.user.spouseOccupation.income)) {
                    this.calculateOccupation.calculateIncome(this.user.spouseOccupation, this.user.spousePersonalInfo.gender, this.user.spouseResults);
                }
                else {
                    check = false;
                    alert('Enter a valid income');
                }
            }
        }
        
        if(check) this.router.navigate('#/personalinfo');
    }
}