import { Component, EventEmitter, Input, Output } from '@angular/core';
import { NgForm} from '@angular/forms';
@Component({
  selector: 'app-file-picker',
  templateUrl: './file-picker.component.html',
  styleUrls: ['./file-picker.component.scss'],
})
export class FilePickerComponent {

  @Output() fileChange = new EventEmitter<any>();
  @Output() uploadClick = new EventEmitter<void>();

  productForm: any = {
    title: '',
    description: '',
    price: 0,
    count: 1,
  }

  create(): void {
    this.uploadClick.emit(this.productForm);
  }
}
