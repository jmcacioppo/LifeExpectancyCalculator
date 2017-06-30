import {inject} from 'aurelia-framework';
import {Router} from 'aurelia-router';
import {User} from '../services/user';
import {Chart} from '../utilities/chart';

@inject(Router, User, Chart)
export class results {
    constructor(router, user, chart) {
        this.router = router;
        this.user = user;
        this.chart = chart;
    }

    attached() {
        this.chart.createChart('chart-container');
    }

    back() {
        this.router.navigate('#/personalinfo');  
    }
}