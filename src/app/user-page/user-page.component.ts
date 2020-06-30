import { Component, OnInit } from '@angular/core';
import {ActivatedRoute} from '@angular/router';
import {UserService} from '../services/user.service';
import {User} from '../models/user';
import {environment} from '../../environments/environment';
import {PostService} from '../services/post.service';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {AlertService} from '../services/alert.service';
import {MatDialog, MatSnackBar} from '@angular/material';
import {AppDialogComponent} from '../app-dialog/app-dialog.component';
import {App} from '../models/app-type';
import {AppService} from '../services/app.service';

@Component({
  selector: 'app-user-page',
  templateUrl: './user-page.component.html',
  styleUrls: ['./user-page.component.scss']
})
export class UserPageComponent implements OnInit {

  private username: string;
  private user: User;

  private posts = [];
  private currentPage = 0;

  postForm: FormGroup;
  loading = false;
  submitted = false;

  selfPage = false;
  currentUser: User;

  siteUrl = environment.siteUrl;
  staticUrl = environment.staticUrl;

  avatarDirectory = `${environment.avatarsUrl}/`;
  defaultAvatar = `${environment.defaultAvatar}/`;

  constructor(private route: ActivatedRoute,
              private userService: UserService,
              private postService: PostService,
              private formBuilder: FormBuilder,
              private alertService: AlertService,
              private appService: AppService,
              public dialog: MatDialog,
              private snackBar: MatSnackBar) { }

  // TODO: разбить компонент
  ngOnInit() {
    this.route.paramMap.subscribe( paramMap => {
      this.username = paramMap.get('username');

      this.userService.getByUsername(this.username).subscribe((user: string) => {
        this.user = JSON.parse(user);
        this.currentUser = this.userService.getCurrentUser();
        this.selfPage = this.currentUser ? this.currentUser.username === this.user.username : false;
      }, (userErr =>  console.log(userErr)));

      // TODO: refactor
      this.postService.getUserPosts(this.username, this.currentPage).subscribe((posts: string | null) => {
        if (posts) { this.currentPage++; }
        this.posts = JSON.parse(posts);
      }, (postError => console.log(postError)));

      this.postForm = this.formBuilder.group({
        text: ['', Validators.required],
      });
  });
  }

  get f() {return this.postForm.controls; }

  onSubmit() {
    this.submitted = true;
    if (this.postForm.invalid) {
      return;
    }
    this.loading = true;

    this.postService.sendPost(this.postForm.value).subscribe((post: string) => {
        this.alertService.success('Пост опубликован', true);
        this.updatePosts(post);
        this.loading = false;
        this.postForm.reset();
      },
      error => {
        this.alertService.error(error);
        this.loading = false;
      });
  }

  openDialog(): void {
    const dialogRef = this.dialog.open(AppDialogComponent, {
      width: '25%',
      data: {username: this.user.username}
    });

    dialogRef.afterClosed().subscribe( (result: App | undefined) => {
      if (typeof result === 'undefined') { return; }
      this.openSnackBar('Приложение ' + result.name + ' загружается', 'Закрыть', 3000);
      this.appService.postApp(result).subscribe(success => {
        this.openSnackBar('Приложение ' + result.name + ' успешно загружено!', 'Закрыть', 4000);
        this.updatePosts(success);
      }, err => {
        this.openSnackBar('Произошла ошибка в загрузке приложения', 'Закрыть', 4000);
        console.log(err);
      });
    });
  }

  openSnackBar(message: string, action: string, duration: number) {
    this.snackBar.open(message, action, {duration});
  }

  updatePosts(post) {
    this.posts.unshift(JSON.parse(post));
  }

  getAppLink(application: App) {
    if (application.isStatic) {
      return this.staticUrl + '/' + application.domain;
    }
    return application.domain + '.' + this.siteUrl;
  }

}
