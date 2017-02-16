import {NavElement} from 'helpers/nav-element';

export class Navigation {
    constructor() {
        this.home = new NavElement("Home");
        this.about = new NavElement("About");
        this.form = new NavElement("Upload");
        this._active = this.home;
    }

    changeActive(navElement) {
        this._active.deactivate();
        navElement.activate();
        this._active = navElement;
        return true;
    }
}