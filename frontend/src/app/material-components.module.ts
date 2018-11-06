import { NgModule } from '@angular/core';
import {MatButtonModule, MatCardModule, MatFormFieldModule, MatInputModule, MatListModule, MatSnackBarModule} from '@angular/material';

@NgModule({
  imports: [MatCardModule, MatButtonModule, MatFormFieldModule, MatInputModule, MatListModule, MatSnackBarModule],
  exports: [MatCardModule, MatButtonModule, MatFormFieldModule, MatInputModule, MatListModule, MatSnackBarModule]
})
export class MaterialComponentsModule { }
