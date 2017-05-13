import { Component, Input, Output, ViewChild, ElementRef, EventEmitter } from '@angular/core';
import { FileInput } from '../models/fileInput';
import { WorkoutAttributes } from '../models/workoutAttributes';

@Component({
    selector: 'file-input',
    templateUrl: './file-input.component.html',
    styleUrls: ['./file-input.component.css']
})
export class FileInputComponent {
    @ViewChild('fileInput') fileInput: ElementRef;
    @Input() file: FileInput;
    @Input() priority: WorkoutAttributes<number>;
    @Output() removeing: EventEmitter<FileInput> = new EventEmitter<FileInput>();


    getFiles(event) {
        this.file.defineContent(event.target.files[0]);
    }

    pick() {
        this.fileInput.nativeElement.click();
    }

    remove() {
        this.removeing.emit(this.file);
    }
}
