import { Component, OnInit } from '@angular/core';
import {User} from '../models/user';
import {UserService} from '../services/user.service';
import {first} from 'rxjs/operators';

@Component({
  selector: 'app-user-list',
  templateUrl: './user-list.component.html',
  styleUrls: ['./user-list.component.scss']
})
export class UserListComponent implements OnInit {
  currentUser: User;
  users: User[] = [];

  constructor(private userService: UserService) {
    this.currentUser = this.userService.getCurrentUser();
  }

  ngOnInit() {
    this.loadAllUsers();
  }
  deleteUser(id: number ) {
    this.userService.delete(id).pipe(first()).subscribe(users => {
      this.loadAllUsers();
    });
  }

  private loadAllUsers() {
    this.userService.getAll().pipe().subscribe(users => {
      // @ts-ignore
      this.users = JSON.parse(users);
    });
  }

}
