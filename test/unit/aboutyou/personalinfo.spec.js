import {CalculateResults} from '../../../src/utilities/calculations/calculateResults';
import {User} from '../../../src/services/user';

//TEST CLIENT PERSONAL INFO
describe('Client Personal Info tests:', () => {
    var user = new User();
    var results = new CalculateResults();
    
    //Sets up the client data before each test
    beforeEach(() => {
        //AGES
        user.clientPersonalInfo.age = 30;

        //GENDER
        user.clientPersonalInfo.gender = "Male";

        //RACES
        user.clientPersonalInfo.race = "White";

        //EDUCATION
        user.clientPersonalInfo.education = "Didn't complete high school";
        
        //MARITAL STATUS
        user.clientPersonalInfo.maritalStatus = "Married";

        //STATE AND COUNTY
        user.clientPersonalInfo.state = "Florida";
        user.clientPersonalInfo.county = "Alachua County";
    });

    //BMI
    it('education expectancy should be -2', () => {
        results.calculateEducation(user.clientPersonalInfo, user.clientResults);
        expect(user.clientResults.education).toBe('-2');
    })

    //CHANGE BMI
    it('county should be Alachua', () => {
        expect(user.clientPersonalInfo.county).toBe('Alachua County');
    })
});