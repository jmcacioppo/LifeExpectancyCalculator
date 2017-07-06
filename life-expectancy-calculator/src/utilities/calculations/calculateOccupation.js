import {inject} from 'aurelia-framework';
import {User} from '../../services/user';

@inject(User)
export class CalculateOccupation {
    constructor(user) {
        this.user = user;
    }

    //Calculate 
    calculateIncome(person, gender, results) {
        var incomeLifeExpectancy = 0;

        if(person.checkincome) {
            if(parseFloat(person.income) >= 188996) {
                if(gender == "male" || gender == "Male") incomeLifeExpectancy += 2.34;
                else if(gender == "Female") incomeLifeExpectancy += 2.91;
            }
            else {
                if(gender == "male" || gender == "Male") incomeLifeExpectancy += 0.32;
                else if(gender == "Female") incomeLifeExpectancy += 0.04;
            }
        }

        person.incomeLifeExpectancy = incomeLifeExpectancy;
        results.income = incomeLifeExpectancy;
    }

}