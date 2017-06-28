import {singleton} from 'aurelia-framework';
import {FamilyHealthData} from '../services/familyHealthData';

@singleton()
export class User {
    constructor() {
        this.client = new FamilyHealthData();
        this.spouse = new FamilyHealthData();
    }
}