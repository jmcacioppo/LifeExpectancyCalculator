import {inject} from 'aurelia-framework';
import {User} from '../../services/user';

@inject(User)
export class CalculateOccupation {
    constructor(user) {
        this.user = user;
    }

}