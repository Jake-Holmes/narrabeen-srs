import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { TableAuthService } from '../auth/table-auth.service';

@Component({
  selector: 'app-table-login',
  templateUrl: './table-login.component.html',
  styleUrls: ['./table-login.component.scss']
})
export class TableLoginComponent implements OnInit {

  form: FormGroup;                    // Declare form.
  private formSubmitAttempt: boolean; // USed to track if form has been submitted.

  constructor(
    private router: Router,
    private fb: FormBuilder,         // Declare use of form builder.
    private tableAuthService: TableAuthService,
  ) { }

  ngOnInit() {
    this.form = this.fb.group({     // Declare variables within form. Validator is simple and set to input required.
      id: ['', Validators.required],
      passcode: ['', Validators.required]
    });
  }

  isFormSubmitted() { //Determines if a submit attempt has been made.
    return this.formSubmitAttempt;
  }

  isFieldInvalid(field: string) { // Determines if field is valid.
    return (
      (!this.form.get(field).valid && this.form.get(field).touched) ||
      (this.form.get(field).untouched && this.formSubmitAttempt)
    );
  }

  async onSubmit() {
    if (this.form.valid) {
      let tempBool = await this.tableAuthService.login(this.form.get('id').value, this.form.get('passcode').value)
      if (tempBool) { //test result of login
        this.formSubmitAttempt = false;
        this.router.navigate(['/tableLanding']);
      } else {
        this.formSubmitAttempt = true;
      };
      this.formSubmitAttempt = true;
    };  // Set form submit attempt as true.
  }
}
