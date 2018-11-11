import { NgModule } from '@angular/core';
import {
  MatButtonModule,
  MatCardModule,
  MatFormFieldModule,
  MatInputModule,
  MatCheckboxModule,
  MatListModule,
  MatSnackBarModule,
  MatChipsModule,
  MatSelectModule,
  MatTooltipModule
} from '@angular/material';

const materialModules: any[] = [
  MatCardModule,
  MatButtonModule,
  MatFormFieldModule,
  MatCheckboxModule,
  MatInputModule,
  MatListModule,
  MatSnackBarModule,
  MatChipsModule,
  MatSelectModule,
  MatTooltipModule
];

@NgModule({
  imports: materialModules,
  exports: materialModules
})
export class MaterialComponentsModule { }
