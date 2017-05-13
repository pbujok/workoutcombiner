import { WorkoutAttributes } from './workoutAttributes';
export class FileInput {
    public conflicts: WorkoutAttributes<boolean>;
    public file: any;
    public index: number

    constructor() {
        this.conflicts = new WorkoutAttributes<boolean>(false, false, false, false, false);
    }

    addConflictedProperty(propertyName) {
        this.conflicts[propertyName.toLowerCase()] = true
    }

    defineContent(content) {
        this.file = content;
    }
}
