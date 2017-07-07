import { inject } from 'aurelia-framework';
import { Router } from 'aurelia-router';
import { User } from '../services/user';
import { CalculateOccupation } from '../utilities/calculations/calculateOccupation';
import { OccupationData } from '../services/data/occupationData';

@inject(Router, User, CalculateOccupation, OccupationData)
export class occupation {

    constructor(router, user, calculateOccupation, occupationData) {
        this.router = router;
        this.user = user;
        this.calculateOccupation = calculateOccupation;
        this.occupationData = occupationData;
        this.occupationData.currentJobArray = this.occupationData.laborArray;
    }

    //DRAG AND DROP
    allowDrop(ev) {
        ev.preventDefault();
    }

    drag(ev) {
        ev.dataTransfer.setData("tonberry", ev.target.innerText);
        this.occupationData.clientOccupationArray.push(ev.srcElement.textContent);
        return true;
    }

    removeDrop(ev) {
        ev.dataTransfer.set
    }

    drop(ev) {
        ev.preventDefault();
        var current;
        var data = ev.dataTransfer.getData("tonberry");
        var elements = document.getElementsByClassName("current-buttons");
        for(var i = 0; i < elements.length; i++) {
            if((elements[i].textContent).trim() === data.trim()) {
                current = elements[i];
            }
        }
        ev.currentTarget.appendChild(current);
    }

    //INCOME
    income(person) {
        person.checkincome = !person.checkincome;
    }

    //CHECK OCCUPATION TYPE
    checkOccupation(person, occupationName) {
        person.type = occupationName.type;
        console.log(person.type);
        console.log(occupationName.type);
        console.log(occupationName.type === "Industry");
        switch(true) {
            case occupationName.type.trim() === "Skilled/Unskilled":
                this.occupationData.currentJobArray = this.occupationData.laborArray;
                break;
            case occupationName.type.trim() === "Industry":
                this.occupationData.currentJobArray = this.occupationData.industryArray;
                break;
            case occupationName.type.trim() === "Public Service":
                this.occupationData.currentJobArray = this.occupationData.publicServiceArray;
                break;
            case occupationName.type.trim() === "Management":
                this.occupationData.currentJobArray = this.occupationData.managementArray;
                break;
        }
    }


    //BUTTONS
    back() {
        this.router.navigate('#/personalinfo');
    }

    submit(occupationArray) {
        var check = true;
        this.calculateOccupation. calculationOccupation(occupationArray);
        console.log(occupationArray);
        
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