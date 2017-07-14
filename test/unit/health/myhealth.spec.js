import {CalculateMyHealth} from '../../../src/utilities/calculations/calculateMyHealth';
import {User} from '../../../src/services/user';

//TEST CLIENT BMI
describe('Client BMI tests:', () => {
    var user = new User();
    var health = new CalculateMyHealth();
    
    //Sets up the client data before each test
    beforeEach(() => {
        user.clientMyHealth.height = "6'0";
        user.clientMyHealth.heightInInches = 72;
        user.clientMyHealth.weight = 165;
    });

    //BMI
    it('bmi should be 22.92', () => {
        health.calculateBMI(user.clientMyHealth);
        expect(user.clientMyHealth.bmi).toBe('22.92');
    })

    //CHANGE BMI
    it('changing the bmi value should change the bmi', () => {
        user.clientMyHealth.bmi = '232.23';
        expect(user.clientMyHealth.bmi).toBe('232.23');
    })
});

//TEST SPOUSE BMI
describe('Spouse BMI tests:', () => {
    var user = new User();
    var health = new CalculateMyHealth();
    
    //Sets up the client data before each test
    beforeEach(() => {
        user.spouseMyHealth.height = "6'0";
        user.spouseMyHealth.heightInInches = 72;
        user.spouseMyHealth.weight = 165;
    });

    //BMI
    it('bmi should be 22.92', () => {
        health.calculateBMI(user.spouseMyHealth);
        expect(user.spouseMyHealth.bmi).toBe('22.92');
    })

    //CHANGE BMI
    it('changing the bmi value should change the bmi', () => {
        user.spouseMyHealth.bmi = '232.23';
        expect(user.spouseMyHealth.bmi).toBe('232.23');
    })
});

//TEST CLIENT EXERCISE
describe('Exercise tests: ', () => {
    var user = new User();
    var health = new CalculateMyHealth();
    
    //Sets up the client data before each test
    beforeEach(() => {
        // user.clientMyHealth.bmi = 20;
        // user.clientMyHealth.bmi = 27;
        // user.clientMyHealth.bmi = 32;
        user.clientMyHealth.bmi = 40;

        // user.clientMyHealth.exercisePerWeek = "0";
        // user.clientMyHealth.exercisePerWeek = "Less than 2.5 hours";
        // user.clientMyHealth.exercisePerWeek = "Approximately 2.5 hours";
        user.clientMyHealth.exercisePerWeek = "More than 2.5 hours";
    });

    //Exercise life expectancy
    it('exercise life expectancy', () => {
        health.calculateExercise(user.clientMyHealth);
        expect(user.clientMyHealth.exerciseLifeExpectancy).toBe(0);
    });
});

//TEST SPOUSE EXERCISE
describe('Exercise tests: ', () => {
    var user = new User();
    var health = new CalculateMyHealth();
    
    //Sets up the spouse data before each test
    beforeEach(() => {
        // user.spouseMyHealth.bmi = 20;
        // user.spouseMyHealth.bmi = 27;
        // user.spouseMyHealth.bmi = 32;
        user.spouseMyHealth.bmi = 40;

        // user.spouseMyHealth.exercisePerWeek = "0";
        // user.spouseMyHealth.exercisePerWeek = "Less than 2.5 hours";
        // user.spouseMyHealth.exercisePerWeek = "Approximately 2.5 hours";
        user.spouseMyHealth.exercisePerWeek = "More than 2.5 hours";
    });

    //Exercise life expectancy
    it('exercise life expectancy', () => {
        health.calculateExercise(user.spouseMyHealth);
        expect(user.spouseMyHealth.exerciseLifeExpectancy).toBe(0);
    });
});

