import {inject} from 'aurelia-framework';
import {User} from '../../services/user';

@inject(User)
export class CalculateFamilyHealth {
    constructor(user) {
        this.user = user;
    }

    calculateAgeOfParents(person, personResults, gender) {
        var parentAges = 0;
        if(person.ageOfParents.indexOf("Both after") !== -1) {
            if(gender == "Male" || gender == 'male') parentAges += 4.2;
            else if(gender == "Female") parentAges += 3.5;
        }
        else if(person.ageOfParents.indexOf("Both before") !== -1) {
            if(gender == "Male" || gender == 'male') parentAges -= 4.2;
            else if(gender == "Female") parentAges -= 3.5;
        }

        personResults.parentAges = parentAges;
    }

}