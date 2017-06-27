import $ from 'jquery'
import 'bootstrap'

import {inject} from 'aurelia-framework';
import {Router} from 'aurelia-router';

@inject(Router)
export class personalinfo {
    constructor(router) {
        this.router = router;
    }
}