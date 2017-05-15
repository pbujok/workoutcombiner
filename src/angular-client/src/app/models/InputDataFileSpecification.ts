export class InputDataFileSpecification {
    private expectedExtencions: string[];

    constructor() {
        this.expectedExtencions = ["tcx", "gpx"];
    }

    public isSatifiedBy(file) {

        if (file == null) {
            return false;
        }

        if (file.name === undefined && file.type === undefined) {
            return false;
        }

        if (file.type && file.type !== "") {
            return this.isOfRequiredType(file);
        } else {
            return this.hasRequiredExtenction(file);
        }
    }

    private isOfRequiredType(file) {
        return this.expectedExtencions.indexOf(file.type) !== -1;
    }

    private hasRequiredExtenction(file) {
        return this.expectedExtencions.findIndex(ex => file.name.endsWith(ex)) !== -1;
    }
}