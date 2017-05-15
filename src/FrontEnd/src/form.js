import { inject, NewInstance, computedFrom } from 'aurelia-framework';
import { ValidationController, ValidationRules, validateTrigger } from 'aurelia-validation';
import { HttpClient, json } from 'aurelia-fetch-client';
import { WorkoutFileUploader } from 'helpers/workout-file-uploader';
import * as toastr from 'toastr/toastr';

class WorkoutAttributes {
    constructor(pulse, altitude, distance, cadence) {
        this.pulse = pulse;
        this.altitude = altitude;
        this.distance = distance;
        this.cadence = cadence;
    }
}

class FileInput {
    constructor(file = undefined) {
        this.file = file;

        this.conflicts = new WorkoutAttributes(false, false, false, false);
        this.priority = new WorkoutAttributes(false, false, false, false);
    }

    pick($event) {
        $($event.srcElement).siblings("input[type='file']").click();
    }

    addConflictedProperty(propertyName) {
        this.conflicts[propertyName.toLowerCase()] = true
    }
}

@inject(NewInstance.of(ValidationController), WorkoutFileUploader, toastr)
export class Form {
    constructor(controller, workoutFileUploader, toastr) {
        this.name = "";
        this.person = new Person('MALE', 75, 25);
        this.toastr = toastr;

        this.fileInputs = [];
        this._controller = controller;
        this.workoutFileUploader = workoutFileUploader;
        this.isDragover = false;

        this._defineValidationRules();
        this._initDropTarget();
    }

    addFileInput() {
        this.fileInputs.push(new FileInput());
    }

    removeFile(file) {
        let index = this.fileInputs.findIndex(n => n === file);
        this.fileInputs.splice(index, 1);
    }

    submit() {
        let self = this;
        this._controller.validate().then((result) => {
            if (result.length > 0) {
                return;
            }
            var priorityInfo = this._constructPriorityInfo();
            let files = this.fileInputs.map(fileInput => fileInput.file);
            this.workoutFileUploader.postFileAjax(files, this.name, this.person, priorityInfo)
                .then(function () {
                    alert('sukces');
                }).fail((data) => {
                    let conflictInfo = JSON.parse(data),
                        conflict,
                        fileIndex;
                    for (let i in conflictInfo) {
                        conflict = conflictInfo[i];
                        for (let f in conflict.containingFile) {
                            fileIndex = conflict.containingFile[f];
                            self.fileInputs[fileIndex].addConflictedProperty(conflict.propertyName);
                        }
                    }

                    this.toastr.error("There are conflicts");
                });
        });
    }

    _constructPriorityInfo() {
        let file,
            result = [],
            priorityInfo;
        for (let i in this.fileInputs) {
            priorityInfo = [];
            file = this.fileInputs[i];
            for (let p in file.priority) {
                if (file.priority[p] === "on") {
                    priorityInfo.push(p);
                }
            }
            result.push({ FileIndex: i, PriorityInfo: priorityInfo });
        }
        return result;
    }

    _defineValidationRules() {
        this._controller.validateTrigger = validateTrigger.blur;
    }
}

export class Person {
    Sex;
    KilogramsWeight;
    Age;
    constructor(sex, weight, age) {
        this.Sex = sex;
        this.KilogramsWeight = weight;
        this.Age = age;
    }
};

ValidationRules.ensure('name').required().minLength(3).on(Form);

ValidationRules
    .ensure('Age').required().minLength(2)
    .ensure('KilogramsWeight').required().minLength(2)
    .ensure('Sex').required().matches(/MALE|FAMALE/)
    .on(Person);
