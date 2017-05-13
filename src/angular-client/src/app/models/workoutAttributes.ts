export class WorkoutAttributes<T> {
    constructor(
        public pulse: T,
        public altitude: T,
        public distance: T,
        public cadence: T,
        public defaultValue: T
    ) {
    }

    public reset() {
        this.pulse = this.defaultValue;
        this.altitude = this.defaultValue;
        this.cadence = this.defaultValue;
        this.distance = this.defaultValue;
    }
}