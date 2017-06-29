import {inject} from 'aurelia-framework';
import {User} from '../services/user';

@inject(User)
export class CalculateMyHealth {
    constructor(user) {
        this.user = user;
    }

    //this calculates the body mass index(if you're wondering, tweet me @JesseCochran1)
    calculateBMI() {
        var metricWeight = this.user.clientMyHealth.weight * 0.45;
        var metricHeight = this.user.clientMyHealth.height * 0.025;
        var metricHeightSquared = metricHeight * metricHeight;
        this.user.clientMyHealth.bmi = metricWeight / metricHeightSquared;
    }
}