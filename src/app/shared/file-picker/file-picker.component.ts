import { Component, EventEmitter, Input, Output } from '@angular/core';
import { NgForm } from '@angular/forms';
@Component({
  selector: 'app-file-picker',
  templateUrl: './file-picker.component.html',
  styleUrls: ['./file-picker.component.scss'],
})
export class FilePickerComponent {
  @Input() file: File | null = null;

  @Output() fileChange = new EventEmitter<File | null>();
  @Output() uploadClick = new EventEmitter<void>();
  @Output() createClick = new EventEmitter<any>();

  productForm: any = {
    title: '',
    description: '',
    price: 0,
    count: 1,
  }

  create(): void {
    this.createClick.emit(this.productForm);
  }

  selectFile(files: FileList | null): void {
    if (!files?.length) {
      this.removeFile();
      return;
    }

    const file = files.item(0) as File;

    if (!['text/csv', 'application/vnd.ms-excel'].includes(file.type)) {
      this.removeFile();
      return;
    }

    this.fileChange.emit(file);
    this.file = file;
  }

  removeFile(): void {
    this.file = null;
    this.fileChange.emit(null);
  }
}
