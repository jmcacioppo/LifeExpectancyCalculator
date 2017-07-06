import {inject} from 'aurelia-framework';
import {StateData} from '../services/data/stateData';
import {OccupationData} from '../services/data/occupationData';

@inject(StateData, OccupationData)
export class ReadFile {

    constructor(stateData, occupationData) {
        this.stateData = stateData;
        this.occupationData = occupationData;
    }

    //Given the json data this method will create a set of states and save in stateData.js
    getStateList(jsonData) {
        var self = this;
        jsonData.forEach(function (stateObject) { 
            self.stateData.stateSet.add(stateObject.State.toLowerCase())
        });
        this.getCountyList(jsonData);
    } 

    //Given a state as input this method reads the json object and returns all counties for that state.
    getCountyList(jsonData) {
        var self = this;
        jsonData.forEach(function (stateObject){
            if(self.stateData.stateToCountyMap.has(stateObject.State.toLowerCase())) {
                   var existingValues = self.stateData.stateToCountyMap.get(stateObject.State.toLowerCase());
                   // Format for each county => County : Male Life Expectancy : Female Life Expectancy
                   existingValues += " " + stateObject.County.toLowerCase() + ":" + stateObject.Male + ":" + stateObject.Female + ",";
                   self.stateData.stateToCountyMap.set(stateObject.State.toLowerCase(), existingValues);
            }
            else self.stateData.stateToCountyMap.set(stateObject.State.toLowerCase(), stateObject.County.toLowerCase() + ":" + stateObject.Male + ":" + stateObject.Female + ",");
        });
    }

    //Given json data as input this method reads the json object and saves the information in a category set and map for jobs.
    getCategoryList(jsonData) {
        var self = this;
        jsonData.forEach((jobObject) => {
            self.occupationData.occupationCategorySet.add(jobObject.Category);
            var existingValues = self.occupationData.categoryToJobMap.get(jobObject.Category);
            existingValues += " " + jobObject.Occupation + ":";
            self.occupationData.categoryToJobMap.set(jobObject.Category, existingValues);
        })
        console.log(this.occupationData.occupationCategorySet);
        console.log(this.occupationData.categoryToJobMap);
    }

    getOccupationDeathNumber(jsonData, arrayOccupations) {
        var self = this;
        
    }
}