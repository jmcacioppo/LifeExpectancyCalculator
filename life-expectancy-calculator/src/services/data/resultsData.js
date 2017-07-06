import {transient} from 'aurelia-framework';

@transient()
export class ResultsData {
    constructor() {
        //PERSONAL INFO EXPECTANCIES
        this.ethnicity = 0;

        //MY HEALTH EXPECTANCIES
        this.exercise = 0;
        this.smoker = 0;
        
        //FAMILY HEALTH EXPECTANCIES


        //OCCUPATION EXPECTANCIES


        //OVERALL EXPECTANCY
        this.overallLifeExpectancy = 0;
    }
}