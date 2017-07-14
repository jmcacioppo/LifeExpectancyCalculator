import {transient} from 'aurelia-framework';

@transient()
export class PersonalInfoData {
    constructor() {
        this.checkspouse = false;
        
        this.age = 30;
        this.checkgender = true;
        this.gender = 'male';

        this.education;
        this.race = 'white';

        this.maritalStatus;
        this.isSingle = false;
        this.isMarried = false;
        this.yearsOfMarriage = 0;
        this.isWidowed = false;
        this.yearsSinceSpousePassing = 0;
        this.isDivorced = false;
        this.yearsOfDivorce = 0;

        this.state = "Please Select";
        this.county = 'Please Select';
        this.countyLifeExpectancy;
        this.expectedYearsLeft;

        this.currentCountyArray = [];
    }
}