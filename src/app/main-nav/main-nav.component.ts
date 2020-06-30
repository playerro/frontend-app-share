import {ChangeDetectorRef, Component, OnInit} from '@angular/core';
import { BreakpointObserver, Breakpoints } from '@angular/cdk/layout';
import { Observable } from 'rxjs';
import { map, shareReplay } from 'rxjs/operators';
import {User} from '../models/user';
import {AuthenticationService} from '../services/authentication.service';
import {UserService} from '../services/user.service';
import {ToolbarService} from '../services/toolbar.service';

@Component({
  selector: 'app-main-nav',
  templateUrl: './main-nav.component.html',
  styleUrls: ['./main-nav.component.scss']
})
export class MainNavComponent implements OnInit {

  private currentUser: User;
  private isAuthorized = false;
  private isAdmin = false;

  title: string;

  isHandset$: Observable<boolean> = this.breakpointObserver.observe(Breakpoints.Handset)
    .pipe(
      map(result => result.matches),
      shareReplay()
    );

  constructor(private breakpointObserver: BreakpointObserver,
              private authenticationService: AuthenticationService,
              private ref: ChangeDetectorRef,
              private userService: UserService,
              private toolbarService: ToolbarService) {}

  ngOnInit() {
    this.toolbarService.getTitle().subscribe(appTitle => this.title = appTitle);
    this.refreshUser(this.userService.getCurrentUser());
    this.authenticationService.currentUser.subscribe((user: User) => {
      this.refreshUser(user);
      this.ref.detectChanges();
    });
  }

  refreshUser(user: User) {
    this.currentUser = user;
    this.checkAuthorized();
    this.checkAdmin();
  }
  checkAuthorized() {
    this.isAuthorized =  ((typeof this.currentUser !== 'undefined') && (this.currentUser !== null));
  }

  checkAdmin() {
    this.isAdmin = (this.currentUser && this.currentUser.isAdmin);
  }
}
