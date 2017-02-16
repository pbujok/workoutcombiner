export class InputDataFileSpecification {
    constructor() {
        this._expectedExtencions = ["tcx", "gpx"];
    }

    isSatifiedBy(file) {
        
        if (file == null) {
            return false;
        }
        
        if (file.name === undefined && file.type === undefined) {
            return false;
        }

        if (file.type && file.type !== "") {
            return this._isOfRequiredType(file);
        } else {
            return this._hasRequiredExtenction(file);
        }
    }

    _isOfRequiredType(file) {
        return this._expectedExtencions.indexOf(file.type) !== -1;
    }

    _hasRequiredExtenction(file) {
        return this._expectedExtencions.findIndex(ex => file.name.endsWith(ex)) !== -1;
    }
}