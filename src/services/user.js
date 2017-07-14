import {singleton} from 'aurelia-framework';
import {PersonalInfoData} from '../services/data/personalInfoData';
import {MyHealthData} from '../services/data/myHealthData';
import {OccupationData} from '../services/data/occupationData';
import {ResultsData} from '../services/data/resultsData';

@singleton()
export class User {
    constructor() {
        this.clientPersonalInfo = new PersonalInfoData();
        this.spousePersonalInfo = new PersonalInfoData();
        
        this.clientMyHealth = new MyHealthData();
        this.spouseMyHealth = new MyHealthData();

        this.clientOccupation = new OccupationData();
        this.spouseOccupation = new OccupationData();

        this.clientResults = new ResultsData();
        this.spouseResults = new ResultsData();
    }
}