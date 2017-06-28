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
        console.log("change");
        this.user.client.familyHealthData.name = "Joseph";
        console.log(this.user.familyhealthdata.name);
    }
}