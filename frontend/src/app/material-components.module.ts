import { NgModule } from '@angular/core';
import {MatButtonModule, MatCardModule, MatFormFieldModule, MatInputModule, MatListModule} from '@angular/material';

@NgModule({
  imports: [MatCardModule, MatButtonModule, MatFormFieldModule, MatInputModule, MatListModule],
  exports: [MatCardModule, MatButtonModule, MatFormFieldModule, MatInputModule, MatListModule]
})
export class MaterialComponentsModule { }
