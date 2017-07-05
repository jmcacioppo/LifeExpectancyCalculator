import {inject} from 'aurelia-framework';
import {Router} from 'aurelia-router';
import {User} from '../services/user';
import {CalculateFamilyHealth} from '../utilities/calculateFamilyHealth';
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
        this.router.navigate('#/personalinfo');  
    }

    attached() {
        this.slider.createLifeExpectancySlider();
    }
}