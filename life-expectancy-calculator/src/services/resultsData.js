import {transient} from 'aurelia-framework';

@transient()
export class ResultsData {
    constructor() {
        this.overallLifeExpectancy;
    }
}