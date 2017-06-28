import {HttpClient} from 'aurelia-fetch-client';

export class ReadFile {
    constructor() {
    }

    //Given a state as input this method reads the csv file and returns all counties for that state.
    getCountyList(state) {
        let httpClient = new HttpClient();

        httpClient.fetch('IHME_USA_EXPECTANCY_1985_2010.csv')
                .then(response => console.log(response.json()))
            .then(data => {
                console.log(data);
            });
    }

    //Given a county name this method will return the life expectancy for that county
    getCountyLifeExpectancy(county) {
        
    }
}