import {computedFrom} from 'aurelia-framework';

export class App {
    configureRouter(config, router) {
        this.router = router;
        config.title = 'Single workout';
        config.map([
          { route: '', name: 'home', moduleId: 'home' },
          { route: '/about', name: 'about', moduleId: 'about' },
          { route: '/form', name: 'form', moduleId: 'form' }
        ]);
    }

    constructor() {
        this.message = 'Hello World!';
        this.name = "name";
        this.activePage = 'home';
    }
    
    @computedFrom("activePage")
    get Active() {
        return this.activePage;
    }

    SetActive(pageName) {
        this.activePage = pageName;
        return true;
    }
}

