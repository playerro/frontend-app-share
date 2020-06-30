import {Component, Inject, OnInit} from '@angular/core';
import {MAT_DIALOG_DATA, MatDialogRef} from '@angular/material';
import {AbstractControl, FormBuilder, FormGroup, Validators} from '@angular/forms';
import {App, APP_TYPES, Types} from '../models/app-type';
import {AppService} from '../services/app.service';
import {map, switchMap} from 'rxjs/operators';
import {of, timer} from 'rxjs';

export interface DialogData {
  username: string;
}

@Component({
  selector: 'app-app-dialog',
  templateUrl: './app-dialog.component.html',
  styleUrls: ['./app-dialog.component.scss']
})
export class AppDialogComponent implements OnInit {
  appForm: FormGroup;
  loading = false;
  submitted = false;
  types: Types[] = APP_TYPES;

  constructor( private formBuilder: FormBuilder,
               public dialogRef: MatDialogRef<AppDialogComponent>,
               private appService: AppService,
               @Inject(MAT_DIALOG_DATA) public data: DialogData) { }

  ngOnInit() {
    this.appForm = this.formBuilder.group({
      name: ['', Validators.required],
      domain: ['', Validators.required, this.validateDomain.bind(this)],
      comment: ['', [Validators.required]],
      isStatic: [false, [Validators.required]],
      source: ['', [Validators.required]],
    });
  }

  get f() {return this.appForm.controls; }

  onNoClick(): void {
    this.dialogRef.close();
  }

  onSubmit() {
    this.submitted = true;

    if (this.appForm.invalid) {
      return;
    }


    const app = this.setAppProperties(this.appForm.value);
    this.submitted = false;
    this.dialogRef.close(app);
  }

  private setAppProperties(formValues) {
    const app = {};
    Object.keys(formValues).forEach((key, index) => {
      app[key] = formValues[key];
    });
    return app;
  }
  validateDomain(control: AbstractControl) {
    return timer(1000).pipe(
      switchMap(() => {
        if (!control.value) {
          return of(null);
        }

        return this.appService
          .domainExists(control.value)
          .pipe(
          map(result => {
            return ((result === true) ? {unique: 'Домен должен быть уникальным!'} : null);
          })
        );
      })
    );
  }
}
