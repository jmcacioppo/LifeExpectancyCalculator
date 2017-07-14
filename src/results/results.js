import {inject} from 'aurelia-framework';
import {Router} from 'aurelia-router';
import {User} from '../services/user';
import {Chart} from '../utilities/chart';
import {CalculateResults} from '../utilities/calculations/calculateResults';
import {Slider} from '../utilities/slider';

@inject(Router, User, Chart, CalculateResults, Slider)
export class results {
    constructor(router, user, chart, calculateResults, slider) {
        this.router = router;
        this.user = user;
        this.chart = chart;
        this.calculateResults = calculateResults;
        this.slider = slider;
    }

    checkSpouseDeath(person) {
        person.checkSpouseDeath = !person.checkSpouseDeath;
    }

    spouseDies(person) {
        console.log(person.spouseDeath);
    }

    attached() {
        this.slider.createSpouseDiesSlider();
        console.log(this.user.clientResults.clientTableAge);
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