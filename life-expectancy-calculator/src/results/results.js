import {inject} from 'aurelia-framework';
import {Router} from 'aurelia-router';
import {User} from '../services/user';
import {Chart} from '../utilities/chart';
import {CalculateResults} from '../utilities/calculateResults';

@inject(Router, User, Chart, CalculateResults)
export class results {
    constructor(router, user, chart, calculateResults) {
        this.router = router;
        this.user = user;
        this.chart = chart;
        this.calculateResults = calculateResults;
    }

    attached() {
        this.chart.createChart('chart-container');
    }

    back() {
        this.router.navigate('#/personalinfo');  
    }
}