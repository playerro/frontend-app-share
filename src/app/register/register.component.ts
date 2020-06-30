import { Component, OnInit } from '@angular/core';
import {AbstractControl, FormBuilder, FormGroup, Validators} from '@angular/forms';
import {UserService} from '../services/user.service';
import {Router} from '@angular/router';
import {AlertService} from '../services/alert.service';
import {first, map, switchMap} from 'rxjs/operators';
import {ToolbarService} from '../services/toolbar.service';
import {of, timer} from 'rxjs';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss']
})
export class RegisterComponent implements OnInit {
  registerForm: FormGroup;
  loading = false;
  submitted = false;

  constructor(private formBuilder: FormBuilder,
              private router: Router,
              private userService: UserService,
              private alertService: AlertService,
              private toolbarService: ToolbarService) { }

  ngOnInit() {
    this.toolbarService.setTitle('Регистрация');
    this.registerForm = this.formBuilder.group({
      firstName: ['', Validators.required],
      lastName: ['', Validators.required],
      username: ['', Validators.required, this.validateUsername.bind(this)],
      email: ['', Validators.required, this.validateEmail.bind(this)],
      password: ['', [Validators.required, Validators.minLength(6)]],
    });
  }

  get f() {return this.registerForm.controls; }

  onSubmit() {
    this.submitted = true;

    if (this.registerForm.invalid) {
      return;
    }

    this.loading = true;

    this.userService.register(this.registerForm.value)
      .pipe(first())
      .subscribe(
        data => {
          this.alertService.success('Registation successfull', true);
          this.router.navigate(['/login']);
        },
        error => {
          this.alertService.error(error);
          this.loading = false;
        });
  }

  validateEmail(control: AbstractControl) {
    return timer(500).pipe(
      switchMap(() => {
        if (!control.value) {
          return of(null);
        }

        return this.userService
          .emailExists(control.value)
          .pipe(
            map(result => {
              return ((result === true) ? {unique: 'Поле должно быть уникальным!'} : null);
            })
          );
      })
    );
  }

  validateUsername(control: AbstractControl) {
    return timer(500).pipe(
      switchMap(() => {
        if (!control.value) {
          return of(null);
        }

        return this.userService
          .usernameExists(control.value)
          .pipe(
            map(result => {
              return ((result === true) ? {unique: 'Поле должно быть уникальным!'} : null);
            })
          );
      })
    );
  }

}
