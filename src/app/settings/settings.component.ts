import { Component, OnInit } from '@angular/core';
import {User} from '../models/user';
import {UserService} from '../services/user.service';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {AlertService} from '../services/alert.service';
import {first} from 'rxjs/operators';
import {ToolbarService} from '../services/toolbar.service';

@Component({
  selector: 'app-settings',
  templateUrl: './settings.component.html',
  styleUrls: ['./settings.component.scss'],
})
export class SettingsComponent implements OnInit {
  user: User;
  settingsForm: FormGroup;
  loading = false;
  submitted = false;
  genders = [{value: 1, label: 'Мужской'}, { value: 0, label: 'Женский'}];
  constructor(private userService: UserService,
              private formBuilder: FormBuilder,
              private alertService: AlertService,
              private toolbarService: ToolbarService) { }

  ngOnInit() {
    this.toolbarService.setTitle('Настройки');
    this.user = this.userService.getCurrentUser();
    this.settingsForm = this.formBuilder.group({
      firstName: ['', Validators.required],
      lastName: ['', Validators.required],
      gender: ['', [Validators.required]],
      birthday: ['', []],
      status: ['', []],
    });
    this.settingsForm.setValue({
      firstName: this.user.firstName,
      lastName: this.user.lastName,
      gender: this.user.gender,
      birthday: this.user.birthday ? new Date(this.user.birthday * 1000) : null,
      status: this.user.status,
    });
  }

  get f() {return this.settingsForm.controls; }

  onSubmit() {
    this.submitted = true;

    if (this.settingsForm.invalid) {
      return;
    }

    this.loading = true;

    this.settingsForm.value.birthday = this.settingsForm.value.birthday.toISOString();
    this.userService.update(this.settingsForm.value)
      .pipe(first())
      .subscribe(
        data => {
          this.alertService.success('Успешно изменено', true);
          this.updateUserLocally(this.settingsForm.value);
          this.loading = false;
        },
        error => {
          this.alertService.error(error);
          this.loading = false;
        });
  }

  updateUserLocally(formValues) {
    Object.keys(formValues).forEach((key, index) => {
      this.user[key] = formValues[key];
    });
    this.user.birthday = new Date(this.user.birthday).getTime() / 1000;
    localStorage.setItem('currentUser', JSON.stringify(this.user));
  }
}
