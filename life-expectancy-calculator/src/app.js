export class App {
  constructor() {
    this.message = 'Life Expectancy Calculator';
  }

  configureRouter(config, router) {
    this.router = router;
    config.title = "Life Expectancy Calculator";
    config.map([
      { route: ['', 'personalinfo'], moduleId: 'aboutyou/personalinfo',
        name: 'personalinfo', title: 'Personal Info', nav: true},

      { route: 'myhealth', moduleId: 'health/myhealth',
        name: 'myhealth', title: 'My Health', nav: true},
      { route: 'familyhealth', moduleId: 'health/familyhealth',
        name: 'familyhealth', title: 'Family Health', nav: true},

      { route: 'occupation', moduleId: 'occupation/occupation',
        name: 'occupation', title: 'Occupation', nav: true},  

      { route: 'results', moduleId: 'results/results',
        name: 'results', title: 'Results', nav: true}
    ]);
  }

}