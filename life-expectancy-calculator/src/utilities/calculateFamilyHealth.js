import {inject} from 'aurelia-framework';
import {User} from '../services/user';

@inject(User)
export class CalculateFamilyHealth {
    constructor(user) {
        this.user = user;
    }

}