import {computedFrom} from 'aurelia-framework';

export class NavElement {
    constructor(name) {
        this.name = name;
        this._isActive = false;
    }

    @computedFrom("_isActive")
    get isActiveClass() {
        return this._isActive ? 'active' : '';
    }

    deactivate() {
        this._isActive = false;
    }

    activate() {
        this._isActive = true;
    }
}