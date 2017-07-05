import {transient} from 'aurelia-framework';

@transient()
export class ResultsData {
    constructor() {
        //PERSONAL INFO EXPECTANCIES
        this.ethnicity;

        //MY HEALTH EXPECTANCIES
        this.exercise;
        this.smoker;
        
        //FAMILY HEALTH EXPECTANCIES


        //OCCUPATION EXPECTANCIES


        //OVERALL EXPECTANCY
        this.overallLifeExpectancy;
    }
}