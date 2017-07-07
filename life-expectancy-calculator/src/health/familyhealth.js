import {inject} from 'aurelia-framework';
import {Router} from 'aurelia-router';
import {User} from '../services/user';
import {CalculateFamilyHealth} from '../utilities/calculations/calculateFamilyHealth';
import {Slider} from '../utilities/slider';

@inject(Router, User, CalculateFamilyHealth, Slider)
export class familyhealth {
    constructor(router, user, calculateFamilyHealth, slider) {
        this.router = router;
        this.user = user;
        this.calculateFamilyHealth = calculateFamilyHealth;
        this.slider = slider;
    }

    //HEART DISEASE
    heartdisease(person) {
        person.checkHeartDisease = !person.checkHeartDisease;
    }

    //CANCER
    cancer(person) {
        person.checkCancer = !person.checkCancer;
    }

    //MENTAL HEALTH
    mentalhealth(person) {
        person.checkMentalHealth = !person.checkMentalHealth;
    }

    //DIABETES
    diabetes(person) {
        person.checkDiabetes = !person.checkDiabetes;
    }

    //BUTTONS
    back() {
        this.router.navigate('#/personalinfo');  
    }

    submit() {
        this.calculateFamilyHealth.calculateAgeOfParents(this.user.clientFamilyHealth, this.user.clientResults, this.user.clientPersonalInfo.gender);

        if(this.user.clientPersonalInfo.checkspouse) {
            this.calculateFamilyHealth.calculateAgeOfParents(this.user.spouseFamilyHealth, this.user.spouseResults, this.user.clientPersonalInfo.gender);            
        }
        
        this.router.navigate('#/personalinfo');  
    }
}