import {inject} from 'aurelia-framework';
import {Router} from 'aurelia-router';
import {User} from '../services/user';

@inject(Router, User)
export class personalinfo {
    constructor(router, user) {
        this.router = router;
        this.user = user;
    }

    gender() {
        this.user.clientPersonalInfo.checkgender = !this.user.clientPersonalInfo.checkgender;
        if(this.user.clientPersonalInfo.checkgender) this.user.clientPersonalInfo.gender = 'Male';
        else this.user.clientPersonalInfo.gender = 'Female';
        console.log(this.user.clientPersonalInfo);
    }

    myhealth() {
        this.router.navigate('#/myhealth');  
    }

    familyhealth() {
        this.router.navigate('#/familyhealth');  
    }

    occupation() {
        this.router.navigate('#/occupation');  
    }

    submit() {
        this.router.navigate('#/results');  
    }
}