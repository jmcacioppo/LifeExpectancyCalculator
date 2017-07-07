import {inject} from 'aurelia-framework';
import {HttpClient, json} from 'aurelia-fetch-client';
import {ReadFile} from 'utilities/readFile';
import $ from 'jquery';
import 'bootstrap';

@inject(HttpClient, ReadFile)
export class App {
  httpClient;

  constructor(httpClient, readFile) {
    this.httpClient = httpClient;
    this.readFile = readFile;
    this.message = 'Life Expectancy Calculator';
  }

  async activate() {
    let data = await this.httpClient.fetch('/api/life-expectancy/get.json');
    let data2 = await data.json();
    this.readFile.getStateList(data2);
  }

  configureRouter(config, router) {
    this.router = router;
    config.title = "Life Expectancy Calculator";
    config.map([
      {
        route: ['', 'personalinfo'], moduleId: 'aboutyou/personalinfo',
        name: 'personalinfo', title: 'Personal Info', nav: true
      },

      {
        route: 'myhealth', moduleId: 'health/myhealth',
        name: 'myhealth', title: 'My Health', nav: true
      },

      {
        route: 'occupation', moduleId: 'occupation/occupation',
        name: 'occupation', title: 'Occupation', nav: true
      },

      {
        route: 'results', moduleId: 'results/results',
        name: 'results', title: 'Results', nav: true
      },

      {
        route: 'jsonfile', moduleId: 'services/lifeExpectancy.json!json',
        name: 'jsonfile', title: 'Json File', nav: true
      }
    ]);
  }
}

