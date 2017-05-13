import { WorkoutAttributes } from './workoutAttributes';
export class FileInput {
    public conflicts: WorkoutAttributes;
    public file: any;
    public index: number

    constructor() {
        this.conflicts = new WorkoutAttributes(false, false, false, false);
    }

    addConflictedProperty(propertyName) {
        this.conflicts[propertyName.toLowerCase()] = true
    }

    defineContent(content) {
        this.file = content;
    }
}
