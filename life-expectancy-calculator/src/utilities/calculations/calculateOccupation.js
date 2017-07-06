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