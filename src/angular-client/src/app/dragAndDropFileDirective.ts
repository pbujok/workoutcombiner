import { Directive, EventEmitter, HostListener, Input, Output } from '@angular/core';
import { InputDataFileSpecification } from './models/InputDataFileSpecification';

@Directive({
    selector: '[fileDnd]'
})
export class DragAndDropFileDirective {
    @Output() fileDrop: EventEmitter<File> = new EventEmitter();

    constructor() { }

    @HostListener('dragover', ['$event']) public onDragOver(evt) {
        evt.preventDefault();
        evt.stopPropagation();
    }

    @HostListener('dragleave', ['$event']) public onDragLeave(evt) {
        evt.preventDefault();
        evt.stopPropagation();
    }

    @HostListener('drop', ['$event']) public onDrop(evt) {
        evt.preventDefault();
        evt.stopPropagation();
        let fileSpecification = new InputDataFileSpecification();
        for (let file in evt.dataTransfer.files) {
            let fileData = evt.dataTransfer.files[file];
            if (fileSpecification.isSatifiedBy(fileData)) {
                this.fileDrop.emit(fileData)
            }
        }
    }
}
