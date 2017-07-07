import {inject} from 'aurelia-framework';
import * as HighCharts from "highcharts";
import {User} from '../services/user';

@inject(User)
export class Chart {
    constructor(user) {
        this.user = user;
    }

    createChart(containerID, age, chartTuples) {
        //console.log(this.user.clientPersonalInfo.testTuples);
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
                        pointStart: age
                    }
                },
                yAxis: {
                    title: {
                        text: 'Chance of Living'
                    }
                },
                series: chartTuples
            }); 
    }
}