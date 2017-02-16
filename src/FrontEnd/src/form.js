﻿import {inject, NewInstance} from 'aurelia-framework';
import {ValidationController, ValidationRules, validateTrigger} from 'aurelia-validation';
import {HttpClient, json} from 'aurelia-fetch-client';
import {WorkoutFileUploader} from 'helpers/workout-file-uploader';
import {InputDataFileSpecification} from 'helpers/input-data-file-specification';
import * as toastr from 'toastr/toastr';

class FileInput {
    constructor(file = undefined) {
        this.file = file;
    }

        pick($event) {
            $($event.srcElement).siblings("input[type='file']").click();
        }
    }

@inject(NewInstance.of(ValidationController), WorkoutFileUploader, toastr)
export class Form {
        constructor(controller, workoutFileUploader, toastr) {
            this.name = "";
            this.person = new Person('FAMALE', 2, 3);
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
        this._controller.validate().then((result) => {
            if(result.length > 0){
                return;
            }
            let files = this.fileInputs.map(fileInput => fileInput.file);
            this.workoutFileUploader.postFileAjax(files, this.name, this.person)
            .then(function(){
                alert('sukces');
            }).fail((err) => {
                this.toastr.error(err);
            });
        });
    }

    _defineValidationRules() {
        this._controller.validateTrigger = validateTrigger.blur;
    }

    _dropFileHandler(e) {
        e.preventDefault();
        if (e.originalEvent && e.originalEvent.dataTransfer) {
            let fileSpecification = new InputDataFileSpecification();
            for (let file in e.originalEvent.dataTransfer.files) {
                file = e.originalEvent.dataTransfer.files[file];
                if (fileSpecification.isSatifiedBy(file)) {
                    this.fileInputs
                        .push(new FileInput(file));
                }
            }
        }
    }

    _initDropTarget() {
        let that = this;
        $(document).on('drag dragstart dragend dragover dragenter dragleave drop', 
            '.upload-file-cnt', function(e) {
                e.preventDefault();
                e.stopPropagation();
            })
            .on('dragover dragenter', '.upload-file-cnt', () => that.isDragover = true)
            .on('dragleave dragend drop','.upload-file-cnt', () => that.isDragover = false)
            .on('drop', '.upload-file-cnt', this._dropFileHandler.bind(this));
    }
}

export class Person{
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
