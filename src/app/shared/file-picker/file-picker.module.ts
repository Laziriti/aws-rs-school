import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FilePickerComponent } from './file-picker.component';
import { MatButtonModule } from '@angular/material/button';
import { FormsModule } from '@angular/forms';
@NgModule({
  declarations: [FilePickerComponent],
  imports: [CommonModule, MatButtonModule, FormsModule],
  exports: [FilePickerComponent],
})
export class FilePickerModule {}
