export class MyHealthData {
    constructor() {
        this.height;
        this.heightInInches;
        this.weight;
        this.bmi;
        this.formHeightWeight = false;

        this.validHeight = false;
        this.validWeight = false;
        this.validBMI = false;
        this.iconType = "underweight";

        this.exercisePerWeek;
        this.sleepPerWeek;
        this.healthRank;

        this.alcoholPerWeek;
        this.checksmoking;

        this.exerciseLifeExpectancy;
    }
}