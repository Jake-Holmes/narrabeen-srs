import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { AuthService } from '../auth/auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-staff-login',
  templateUrl: './staff-login.component.html',
  styleUrls: ['./staff-login.component.scss'],
})
export class StaffLoginComponent implements OnInit {

  form: FormGroup;                    // Declare form.
  private formSubmitAttempt: boolean; // USed to track if form has been submitted.

  constructor(
    private router: Router,
    private fb: FormBuilder,         // Declare use of form builder.
    private authService: AuthService,
  ) {
    this.formSubmitAttempt = false;
  }

  ngOnInit() {
    this.form = this.fb.group({     // Declare variables within form. Validator is simple and set to input required.
      userName: ['', Validators.required],
      password: ['', Validators.required]
    });
  }

  isFieldInvalid(field: string) { // Determines if field is valid.
    return (
      (!this.form.get(field).valid && this.form.get(field).touched) ||
      (this.form.get(field).untouched && this.formSubmitAttempt)
    );
  }

  isFormSubmitted() { //Determines if a submit attempt has been made.
    return this.formSubmitAttempt;
  }

  async onSubmit() {
    if (this.form.valid) {
      let tempBool = await this.authService.login(this.form.get('userName').value, this.form.get('password').value)
      if (tempBool) { //send to login service
        this.formSubmitAttempt = false;
        this.router.navigate(['/staffHome']);
      } else {
        this.formSubmitAttempt = true;
      };
    };  // Set form submit attempt as true.
  }

  resolveAfter2Seconds(x) {
    return new Promise(resolve => {
      setTimeout(() => {
        resolve(x);
      }, 2000);
    });
}

}
