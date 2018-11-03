import { NgModule } from '@angular/core';
import {MatButtonModule, MatCardModule, MatFormFieldModule, MatInputModule} from '@angular/material';

@NgModule({
  imports: [MatCardModule, MatButtonModule, MatFormFieldModule, MatInputModule],
  exports: [MatCardModule, MatButtonModule, MatFormFieldModule, MatInputModule]
})
export class MaterialComponentsModule { }
