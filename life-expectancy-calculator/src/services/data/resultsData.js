import {transient} from 'aurelia-framework';

@transient()
export class ResultsData {
    constructor() {
        //PERSONAL INFO EXPECTANCIES
        this.education = 0;

        //MY HEALTH EXPECTANCIES
        this.exercise = 0;
        this.smoker = 0;
        this.diabetes = 0;
        
        //FAMILY HEALTH EXPECTANCIES


        //OCCUPATION EXPECTANCIES
        this.income = 0;

        //OVERALL EXPECTANCY
        this.overallLifeExpectancy = 0;
    }
}