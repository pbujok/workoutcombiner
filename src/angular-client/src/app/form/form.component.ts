import { Component, OnInit } from '@angular/core';
import { Person } from '../models/person';
import { FileInput } from '../models/fileInput';
import { ApiService } from '../api.service';
import { Response } from '@angular/http';
import { WorkoutAttributes } from '../models/workoutAttributes';
import * as FileSaver from 'file-saver';

@Component({
    selector: 'upload-form',
    templateUrl: './form.component.html',
    styleUrls: ['./form.component.css']
})
export class FormComponent implements OnInit {
    public person: Person;
    public name: string;
    public fileInputs: FileInput[];
    public priority: WorkoutAttributes<boolean>;

    constructor(private apiService: ApiService) {
    }

    ngOnInit() {
        this.person = new Person("MALE", 75, 25);
        this.name = "Combined workout";
        this.priority = new WorkoutAttributes<boolean>(null, null, null, null, null);
        this.fileInputs = [];
    }

    addFileInput() {
        let fileinput = new FileInput();
        fileinput.index = this.fileInputs.length;
        this.fileInputs.push(fileinput);
    }

    removeFileInput(fileInput: FileInput) {
        let index = this.fileInputs.indexOf(fileInput);
        if (index >= 0) {
            this.fileInputs.splice(index, 1);
        }

        let count = this.fileInputs.length;
        for (let i = 0; i < count; ++i) {
            this.fileInputs[i].index = i;
        }
    }

    hasAnyConflict(property: string): boolean {
        let element = this.fileInputs.filter(n => n.conflicts[property] == true);
        return element.length > 0;
    }

    submit() {
        let priorityInfo = this.constructPriorityInfo();
        let files = this.fileInputs.map(fileInput => fileInput.file);
        this.apiService.sendFile(files, this.name, this.person, priorityInfo)
            .then((res) => this.saveFile(res))
            .catch((data) => {
                let conflictInfo = JSON.parse(data.text()),
                    conflict,
                    fileIndex;
                for (let i in conflictInfo) {
                    conflict = conflictInfo[i];
                    for (let f in conflict.containingFile) {
                        fileIndex = conflict.containingFile[f];
                        this.fileInputs[fileIndex].addConflictedProperty(conflict.propertyName);
                    }
                }
            });
    }

    private saveFile(response: Response) {
        let xml = response.text();
        let data = new Blob([xml], { type: 'text/xml' });
        FileSaver.saveAs(data, this.name + '.tcx');
    }

    private constructPriorityInfo() {
        let i = 0,
            filesCount = this.fileInputs.length,
            result = [],
            p;
        for (; i < filesCount; ++i) {
            result.push({ FileIndex: i, PriorityInfo: [] });
        }

        for (p in this.priority) {
            let fileIndex = this.priority[p];
            if (typeof (fileIndex) !== 'function' && fileIndex !== this.priority.defaultValue) {
                let intIndex = parseInt(fileIndex);
                result[intIndex].PriorityInfo.push(p);
            }
        }
        
        return result;
    }
}
