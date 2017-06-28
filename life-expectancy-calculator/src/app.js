import {inject} from 'aurelia-framework';
import {HttpClient, json} from 'aurelia-fetch-client';
import $ from 'jquery';
import 'bootstrap';


@inject(HttpClient)
export class App {

  httpClient;
  
  constructor(httpClient) {
    this.httpClient = httpClient;
    this.message = 'Life Expectancy Calculator';
  }

  async activate() {
    await this.httpClient.fetch('/api/life-expectancy/get.json');
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
        name: 'results', title: 'Results', nav: true},

      { route: 'jsonfile', moduleId: 'services/lifeExpectancy.json!json',
        name: 'jsonfile', title: 'Json File', nav: true}
    ]);
  }


}
