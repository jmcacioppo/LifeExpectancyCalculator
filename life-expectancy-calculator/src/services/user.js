import {singleton} from 'aurelia-framework';
import {PersonalInfoData} from '../services/personalInfoData';
import {MyHealthData} from '../services/myHealthData';
import {FamilyHealthData} from '../services/familyHealthData';
import {OccupationData} from '../services/occupationData';
import {ResultsData} from '../services/resultsData';

@singleton()
export class User {
    constructor() {
        this.clientPersonalInfo = new PersonalInfoData();
        this.spousePersonalInfo = new PersonalInfoData();
        
        this.clientMyHealth = new MyHealthData();
        this.spouseMyHealth = new MyHealthData();

        this.clientFamilyHealth = new FamilyHealthData();
        this.spouseFamilyHealth = new FamilyHealthData();

        this.clientOccupation = new OccupationData();
        this.spouseOccupation = new OccupationData();

        this.clientResults = new ResultsData();
        this.spouseResults = new ResultsData();
    }
}