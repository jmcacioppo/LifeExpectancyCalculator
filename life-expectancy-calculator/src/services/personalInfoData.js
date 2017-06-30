import {transient} from 'aurelia-framework';

@transient()
export class PersonalInfoData {
    constructor() {
        this.age = 30;
        this.checkgender = true;
        this.gender = 'male';
        this.race = 'white';
        this.checkspouse = false;
        this.state = "Please Select";
        this.county = 'Please Select';
        this.countyLifeExpectancy;
        this.expectedAge;
    }
}