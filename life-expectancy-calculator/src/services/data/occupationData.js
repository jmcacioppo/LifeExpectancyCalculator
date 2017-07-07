export class OccupationData {
    constructor() {
        this.checkincome = false;
        this.income = 0;
        this.incomeLifeExpectancy = 0;

        this.occupationType = ['Skilled/Unskilled', 'Industry', 'Public Service', 'Management'];
        this.type = 'Skilled/Unskilled';

        this.occupationCategorySet = new Set();
        this.categoryToJobMap = new Map();
        this.occupationChangeInLifeExpectancy = 0;

        this.laborArray = [];
        this.industryArray = [];
        this.publicServiceArray = [];
        this.managementArray = [];
        this.currentJobArray = [];

        this.clientOccupationArray = [];
    }
}