import {inject} from 'aurelia-framework';
import {Router} from 'aurelia-router';

@inject(Router)
export class occupation {
    constructor(router) {
        this.router = router;
    }
}