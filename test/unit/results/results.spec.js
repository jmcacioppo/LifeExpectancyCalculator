import {User} from '../../../src/services/user';

//Test the occupation page
describe('results', () => {
    var user = new User();
    beforeEach(() => {
        user.clientMyHealth.height = "6'0";
        user.clientMyHealth.weight = 165;
        user.clientMyHealth.heightInInches = 72;
        user.clientMyHealth.bmi = '22.92';
        user.clientPersonalInfo.state = 'Virginia';
        user.clientPersonalInfo.county = 'Powhatan';

    });

    //TODO: Enter test for occupation impact on life expectancy
});