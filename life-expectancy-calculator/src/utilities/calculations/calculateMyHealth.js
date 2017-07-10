import {inject} from 'aurelia-framework';
import {HttpClient, json} from 'aurelia-fetch-client';
import {User} from '../../services/user';
import {ReadFile} from '../readFile';

@inject(User, ReadFile, HttpClient)
export class CalculateMyHealth {
    constructor(user, readFile, httpClient) {
        this.user = user;
        this.readFile = readFile;
        this.httpClient = httpClient;
    }

    //this calculates the body mass index(if you're wondering, tweet me @JesseCochran1)
    calculateBMI(person) {
        var metricWeight = person.weight * 0.45;
        var metricHeight = person.heightInInches * 0.025;
        var metricHeightSquared = metricHeight * metricHeight;
        person.bmi = (metricWeight / metricHeightSquared).toPrecision(4);
    }

    //this calculates added/decreased life expectancy based on how many hours of exercise per week
    calculateExercise(person) {
        var exerciseLifeExpectancy = 0;

        if(person.exercisePerWeek) {
            var bmi = person.bmi;

            if(person.exercisePerWeek.indexOf("0") !== -1) {
                exerciseLifeExpectancy = 0;
                if(bmi >= 18.5 && bmi < 25) exerciseLifeExpectancy -= 4.7;
                else if(bmi >= 25 && bmi < 30) exerciseLifeExpectancy -= 3.9;
                else if(bmi >= 30 && bmi < 35) exerciseLifeExpectancy -= 5.0;
                else if(bmi >= 35) exerciseLifeExpectancy -= 7.2;
            }
            else if(person.exercisePerWeek.indexOf("Less") !== -1) {
                exerciseLifeExpectancy = 1.8;
                if(bmi >= 18.5 && bmi <= 24.9) exerciseLifeExpectancy -= 2.4;
                else if(bmi >= 25 && bmi < 30) exerciseLifeExpectancy -= 1.8;
                else if(bmi >= 30 && bmi < 35) exerciseLifeExpectancy -= 3.2;
                else if(bmi >= 35) exerciseLifeExpectancy -= 6.2;
            }
            else if(person.exercisePerWeek.indexOf("Approximately") !== -1) {
                exerciseLifeExpectancy = 3.4;
                if(bmi >= 18.5 && bmi <= 24.9) exerciseLifeExpectancy -= 0;
                else if(bmi >= 25 && bmi < 30) exerciseLifeExpectancy -= 0;
                else if(bmi >= 30 && bmi < 35) exerciseLifeExpectancy -= 1.6;
                else if(bmi >= 35) exerciseLifeExpectancy -= 4.5;
            }
            else if(person.exercisePerWeek.indexOf("More") !== -1) {
                exerciseLifeExpectancy = 4.5;
                if(bmi >= 18.5 && bmi <= 24.9) exerciseLifeExpectancy -= 0;
                else if(bmi >= 25 && bmi < 30) exerciseLifeExpectancy -= 0;
                else if(bmi >= 30 && bmi < 35) exerciseLifeExpectancy -= 1.6;
                else if(bmi >= 35) exerciseLifeExpectancy -= 4.5;
            }
        }
        person.exerciseLifeExpectancy = exerciseLifeExpectancy;
    }

    calculateHealthRank(person, personResults) {
        if(person.healthRank == "I'm in great health") personResults.healthrank = 3.8;
        else if(person.healthRank == "I'm in poor health") personResults.healthrank = -3.8;
        else personResults.healthRank = 0;
    }

    //this calculates added/decreased life expectancy based on smoking
    calculateSmoker(person) {
        var smokerLifeExpectancy = 0;
        var stillSmoking = person.checkStillSmoking;
        var kindOfSmoker = person.kindOfSmoker;
        
        //CHECK KIND OF SMOKER
        if(kindOfSmoker.indexOf("Light") !== -1) {
            smokerLifeExpectancy = -4.8;

            //Add years if they quit smoking
            if(!stillSmoking) { 
                var age = person.ageQuitSmoking;
                if(age.indexOf("25") !== -1) smokerLifeExpectancy += 4.8; //max 10
                else if(age.indexOf("35") !== -1) smokerLifeExpectancy += 4.8; //max 9
                else if(age.indexOf("45") !== -1) smokerLifeExpectancy += 4.8; //max 6
                else if(age.indexOf("60") !== -1) smokerLifeExpectancy += 3; //max 3
            }
        }
        else if(kindOfSmoker.indexOf("Average") !== -1) {
            smokerLifeExpectancy -= 6.8;

            //Add years if they quit smoking
            if(!stillSmoking) { 
                var age = person.ageQuitSmoking;
                if(age.indexOf("25") !== -1) smokerLifeExpectancy += 6.8; //max 10
                else if(age.indexOf("35") !== -1) smokerLifeExpectancy += 6.8; //max 9
                else if(age.indexOf("45") !== -1) smokerLifeExpectancy += 6; //max 6
                else if(age.indexOf("60") !== -1) smokerLifeExpectancy += 3; //max 3
            }
        }
        else if(kindOfSmoker.indexOf("Heavy") !== -1) {
            smokerLifeExpectancy -= 8.8;

            //Add years if they quit smoking
            if(!stillSmoking) { 
                var age = person.ageQuitSmoking;
                if(age.indexOf("25") !== -1) smokerLifeExpectancy += 8.8; //max 10
                else if(age.indexOf("35") !== -1) smokerLifeExpectancy += 8.8; //max 9
                else if(age.indexOf("45") !== -1) smokerLifeExpectancy += 6; //max 6
                else if(age.indexOf("60") !== -1) smokerLifeExpectancy += 3; //max 3
            }
        }
        person.smokerLifeExpectancy = smokerLifeExpectancy;
    }

    //this calculates added/decreased life expectancy based on mental illness
    calculateMentalHealth(person, personResults) {
        if(person.checkmental) {
            personResults.mental = -9;
        }
        else {
            personResults.mental = 0;
        }
    }

    calculateAgeOfParents(person, personResults, gender) {
        var parentAges = 0;
        if(person.ageOfParents == "Both after the age of 75" || person.ageOfParents == "They are both still alive and older than 75") {
            if(gender == "Male" || gender == 'male') parentAges += 4.2;
            else if(gender == "Female") parentAges += 3.5;
        }
        else if(person.ageOfParents == "Both before the age of 75") {
            if(gender == "Male" || gender == 'male') parentAges -= 4.2;
            else if(gender == "Female") parentAges -= 3.5;
        }

        personResults.parentAges = parentAges;
    }

    //Given a person, this method calculates the impact of alcohol consumption on life expectancy
    async calculateAlcoholConsumption(personHealth, personInfo, personResults) {
        console.log(personInfo);
        console.log(personHealth);
        var jsonName = personInfo.race.toLowerCase() + "-" + personInfo.gender + ".json";
        var alcohol = personHealth.alcoholPerWeek;
        var jsonValueToSearch;
        switch(true) {
            case alcohol === 'None':
                jsonValueToSearch = 'no drinks';
                break;
            case alcohol === 'Less than 2':
                jsonValueToSearch = 'less than 2 drinks';
                break;
            case alcohol === 'Between 2 and 7':
                jsonValueToSearch = 'between 2 and 7 drinks';
                break;
            default:
                jsonValueToSearch = 'more than 8 drinks';
                break;
        }
        let jsonData = await this.httpClient.fetch('/api/alcohol-table/' + jsonName);
        let json = await jsonData.json()
        this.readFile.getAlcoholConsumption(personHealth, json, jsonValueToSearch);
        personResults.alcohol = personHealth.alcoholConsumptionImpact;
    }
}