export class MyHealthData {
    constructor() {
        this.height;
        this.heightInInches;
        this.weight;
        this.bmi;
        this.formHeightWeight = false;
        this.exerciseLifeExpectancy = 0;

        this.validHeight = false;
        this.validWeight = false;
        this.validBMI = false;
        this.iconType = "underweight";
        this.heightError = "";

        this.exercisePerWeek;
        this.healthRank;
        this.checkdiabetes = false;
        this.checkmental = false;
        this.alcoholPerWeek;
        this.alcoholConsumptionImpact = 0;

        this.checksmoking = false;
        this.checkStillSmoking = true;
        this.kindOfSmoker;
        this.ageQuitSmoking;
        this.smokerLifeExpectancy = 0;

        this.ageOfParents;
    }
}