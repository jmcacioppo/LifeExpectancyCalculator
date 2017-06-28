import {HttpClient} from 'aurelia-fetch-client';
import * as jsonData from 'text!./../services/lifeExpectancy.json';

export class ReadFile {
    constructor() {
        console.log(jsonData);
    }

    //Given a state as input this method reads the csv file and returns all counties for that state.
    getCountyList(state) {
    }

    //Given a county name this method will return the life expectancy for that county
    getCountyLifeExpectancy(county) {
        
    }
}