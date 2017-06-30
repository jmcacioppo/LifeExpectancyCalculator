import {transient} from 'aurelia-framework';

@transient()
export class PersonalInfoData {
    constructor() {
        this.age = 30;
        this.checkgender = true;
        this.gender = 'male';
        this.race = 'white';
        this.checkspouse = false;
        this.state = 'alabama';
        this.county = 'autauga county';
        this.countyLifeExpectancy;
        this.expectedAge;
    }
}