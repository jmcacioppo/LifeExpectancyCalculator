import {transient} from 'aurelia-framework';

@transient()
export class PersonalInfoData {
    constructor() {
        this.checkspouse = false;
        
        this.age = 30;
        this.checkgender = true;
        this.gender = 'male';
        this.race = 'white';
        this.maritalStatus;

        this.state = "Please Select";
        this.county = 'Please Select';
        this.countyLifeExpectancy;
        this.expectedYearsLeft;
        this.testTuples = [];

        this.ethnicityLifeExpectancy;
    }
}