import {transient} from 'aurelia-framework';

@transient()
export class PersonalInfoData {
    constructor() {
        this.age;
        this.checkgender = true;
        this.gender;
        this.race;
        this.checkspouse = false;
        this.state = 'alabama';
        this.county = 'autauga county';
        this.countyLifeExpectancy;
    }
}