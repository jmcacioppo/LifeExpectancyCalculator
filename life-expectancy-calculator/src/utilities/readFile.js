import {inject} from 'aurelia-framework';
import {StateData} from '../services/stateData';

@inject(StateData)
export class ReadFile {

    constructor(stateData) {
        this.stateData = stateData;
    }

    //Given the json data this method will create a set of states and save in stateData.js
    getStateList(jsonData) {
        var self = this;
        jsonData.forEach(function (stateObject) { 
            self.stateData.stateSet.add(stateObject.State.toLowerCase())
        });
        this.getCountyList(jsonData);
    } 

    //Given a state as input this method reads the csv file and returns all counties for that state.
    getCountyList(jsonData) {
        var self = this;
        jsonData.forEach(function (stateObject){
            if(self.stateData.stateToCountyMap.has(stateObject.State.toLowerCase())) {
                   var existingValues = self.stateData.stateToCountyMap.get(stateObject.State.toLowerCase());
                   existingValues += " " + stateObject.County.toLowerCase() + ",";
                   self.stateData.stateToCountyMap.set(stateObject.State.toLowerCase(), existingValues);
            }
            else  self.stateData.stateToCountyMap.set(stateObject.State.toLowerCase(), stateObject.County.toLowerCase() + ",");
        });
    }

    //Given a county name this method will return the life expectancy for that county
    getCountyLifeExpectancy(jsonData) {
        var self = this;
        jsonData.forEach(function (stateObject) {
            if(self.stateData.countyToLifeExpectancy.has(stateObject.County.toLowerCase())) {
                
            }
        });
    }
}