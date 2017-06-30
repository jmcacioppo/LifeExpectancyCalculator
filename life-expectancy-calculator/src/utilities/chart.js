import {inject} from 'aurelia-framework';
import * as HighCharts from "highcharts";
import {User} from '../services/user';

@inject(User)
export class Chart {
    constructor(user) {
        this.user = user;
    }

    createChart(containerID) {
        console.log(this.user.clientPersonalInfo.testTuples);
        Highcharts.chart(containerID, {
                title: {
                    text: 'Life Expectancy'
                },
                xAxis: {
                    title: {
                        text: 'Age'
                    }
                },
                plotOptions: {
                    series: {
                        pointStart: this.user.clientPersonalInfo.age
                    }
                },
                yAxis: {
                    title: {
                        text: 'Probability'
                    }
                },
                series: [{
                    name: 'Client',
                    data:  this.user.clientPersonalInfo.testTuples
                }, {
                    name: 'Co-client',
                    data: this.user.clientPersonalInfo.testTuples
                }, {
                    name: 'Average',
                    data: this.user.clientPersonalInfo.testTuples
                }]
            }); 
    }
}