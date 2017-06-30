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
    heartdisease() {
        this.user.clientFamilyHealth.checkHeartDisease = !this.user.clientFamilyHealth.checkHeartDisease;
    }

    spouseheartdisease() {
        this.user.spouseFamilyHealth.checkHeartDisease = !this.user.spouseFamilyHealth.checkHeartDisease;
    }

    //CANCER
    cancer() {
        this.user.clientFamilyHealth.checkCancer = !this.user.clientFamilyHealth.checkCancer;
    }

    spousecancer() {
        this.user.spouseFamilyHealth.checkCancer = !this.user.spouseFamilyHealth.checkCancer;
    }

    //MENTAL HEALTH
    mentalhealth() {
        this.user.clientFamilyHealth.checkMentalHealth = !this.user.clientFamilyHealth.checkMentalHealth;
    }

    spousementalhealth() {
        this.user.spouseFamilyHealth.checkMentalHealth = !this.user.spouseFamilyHealth.checkMentalHealth;
    }

    //DIABETES
    diabetes() {
        this.user.clientFamilyHealth.checkDiabetes = !this.user.clientFamilyHealth.checkDiabetes;
    }

    spousediabetes() {
        this.user.spouseFamilyHealth.checkDiabetes = !this.user.spouseFamilyHealth.checkDiabetes;
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