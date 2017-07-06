import {CalculateMyHealth} from '../../../src/utilities/calculateMyHealth';
import {User} from '../../../src/services/user';

describe('my health', () => {
    var user = new User();
    var health = new CalculateMyHealth();
    beforeEach(() => {
        user.clientMyHealth.height = "6'0";
        user.clientMyHealth.heightInInches = 72;
        user.clientMyHealth.weight = 165;
    });

    it('client height should be 72', () => {
        console.log(user.clientMyHealth.weight);
        expect(user.clientMyHealth.height).toBe("6'0");
    });

    it('client weight should be 165', () => {
        expect(user.clientMyHealth.weight).toBe(165);
    });

    it('client bmi should be 22.92', () => {
        health.calculateBMI(user.clientMyHealth);
        expect(user.clientMyHealth.bmi).toBe('22.92');
    })

    it('changing the bmi value should change the clients bmi', () => {
        user.clientMyHealth.bmi = '232.23';
        expect(user.clientMyHealth.bmi).toBe('232.23');
    })

});