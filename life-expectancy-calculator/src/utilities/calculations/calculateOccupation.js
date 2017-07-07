import {inject} from 'aurelia-framework';
import {User} from '../../services/user';
import {HttpClient, json} from 'aurelia-fetch-client';
import {ReadFile} from 'utilities/readFile';
import {OccupationData} from '../../services/data/occupationData';

@inject(User, HttpClient, ReadFile, OccupationData)
export class CalculateOccupation {
    constructor(user, httpClient, readFile, occupationData) {
        this.user = user;
        this.httpClient = httpClient;
        this.readFile = readFile;
        this.occupationData = occupationData;
    }

    //Calculate income
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

    //Loads the occupation data
    async loadOccupation() {
        let data = await this.httpClient.fetch('/api/occupation-table/occupation.json');
        let loadedData = await data.json();
        this.readFile.getCategoryList(loadedData);
        this.createJobArrays("Manual Labor");
        this.createJobArrays("Industry");
        this.createJobArrays("Public Service");
        this.createJobArrays("Management");
    }

    //Calculate life expectancy values based on occupation
    async calculationOccupation(arrayOccupations) {
        let data = await this.httpClient.fetch('/api/occupation-table/occupation.json');
        let loadedData = await data.json();
        this.occupationData.occupationChangeInLifeExpectancy = this.readFile.getOccupationDeathNumber(loadedData, arrayOccupations);
    }

    //Creates job array
    createJobArrays(type) {
        var currentArray = [];
        var listToArray = this.occupationData.categoryToJobMap.get(type).split(":");
        listToArray.forEach(function (job) {
            currentArray.push(job);
        }); 
        //Gets rid of blank space at end of array
        currentArray.pop();
        switch(true) {
            case type === 'Manual Labor':
                this.occupationData.laborArray = currentArray;
                break;
            case type === 'Industry':
                this.occupationData.industryArray = currentArray;
                break;
            case type === 'Public Service':
                this.occupationData.publicServiceArray = currentArray;
                break;
            case type === 'Management':
                this.occupationData.managementArray = currentArray;
                break;
        }
        console.log(this.occupationData.laborArray);
    }
}