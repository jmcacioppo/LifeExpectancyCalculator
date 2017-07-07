import {inject} from 'aurelia-framework';
import {Router} from 'aurelia-router';
import {User} from '../services/user';
import {Chart} from '../utilities/chart';
import {CalculateResults} from '../utilities/calculations/calculateResults';

@inject(Router, User, Chart, CalculateResults)
export class results {
    constructor(router, user, chart, calculateResults) {
        this.router = router;
        this.user = user;
        this.chart = chart;
        this.calculateResults = calculateResults;
    }

    attached() {
        var chartTuples = [];
        if(this.user.clientPersonalInfo.checkspouse) {
            chartTuples = [{
                    name: 'Client',
                    data:  this.user.clientResults.clientTuples
                }, {
                    name: 'Co-client',
                    data:  this.user.spouseResults.spouseTuples
                }, {
                    name: 'Average',
                    data:  this.user.clientResults.averageTuples
                }];
        }
        else {
            chartTuples = [{
                    name: 'Client',
                    data:  this.user.clientResults.clientTuples
                }, {
                    name: 'Average',
                    data:  this.user.clientResults.averageTuples
                }]
        }

        this.chart.createChart('chart-container', this.user.clientPersonalInfo.age, chartTuples);
    }

    back() {
        this.router.navigate('#/personalinfo');  
    }
}