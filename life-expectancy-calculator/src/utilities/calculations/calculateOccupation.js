import {inject} from 'aurelia-framework';
import {User} from '../../services/user';
import {HttpClient, json} from 'aurelia-fetch-client';
import {ReadFile} from 'utilities/readFile';

@inject(User, HttpClient, ReadFile)
export class CalculateOccupation {
    constructor(user, httpClient, readFile) {
        this.user = user;
        this.httpClient = httpClient;
        this.readFile = readFile;
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

    async loadOccupation() {
        let data = await this.httpClient.fetch('/api/occupation-table/occupation.json');
        let loadedData = await data.json();
        this.readFile.getCategoryList(loadedData);
    }

    async calculationOccupation(arrayOccupations) {
        let data = await this.httpClient.fetch('/api/occupation-table/occupation.json');
        let loadedData = await data.json();
        this.user.occupationData.occupationChangeInLifeExpectancy = this.readFile.getOccupationDeathNumber(arrayOccupations);
    }
}