import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { AuthService } from '../../core/service/auth/auth.service';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { first } from 'rxjs/operators';
import { UserService } from '../../core/service/user/user.service';

@Component({
  selector: 'app-dashboard',
  templateUrl: 'login.component.html'
})
export class LoginComponent implements OnInit {
  loginForm: FormGroup;
  loading = false;
  submitted = false;
  returnUrl: string;
  error: string;

  constructor(
      private formBuilder: FormBuilder,
      private route: ActivatedRoute,
      private router: Router,
      private authService: AuthService,
      private userService: UserService
  ) {

    if (this.authService.currentTokenValue) {
      this.router.navigate(['/dashboard']);
    }
  }

  ngOnInit(): void {
    this.loginForm = this.formBuilder.group({
      username: ['', Validators.required],
      password: ['', [Validators.required, Validators.minLength(7)]]
    });

    this.returnUrl = this.route.snapshot.queryParams['returnUrl'] || '/dashboard';
  }

  get formControl() {
    return this.loginForm.controls;
  }

  login(event) {
    event.stopPropagation();
    event.preventDefault();

    this.submitted = true;

    if (this.loginForm.invalid) {
      return;
    }

    this.loading = true;

    this.authService
        .login(this.formControl.username.value, this.formControl.password.value)
        .pipe(first())
        .subscribe(
            data => {
              this.userService.getProfile()
                  .pipe(first())
                  .subscribe(
                      user => this.router.navigate([this.returnUrl]),
                      error => this.onError(error));
            },
            error => this.onError(error)
        );
  }

  private onError(error) {
    this.error = error;
    this.loading = false;
    console.error(error);
    this.authService.logout();
  }
}
