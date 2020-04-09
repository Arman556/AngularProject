import { Component, OnInit } from '@angular/core';
import { UserData } from 'src/app/DataModels/UserData';
import { Role } from 'src/app/DataModels/enum-role';
import { NgForm } from '@angular/forms';

@Component({
  selector: 'app-new-user',
  templateUrl: './add-user.component.html',
  styleUrls: ['./add-user.component.css']
})

export class AddUserComponent implements OnInit {
  UserForm: boolean;
  userData: UserData;
  storeRole: string[] = [];
  constructor() { }

  ngOnInit(): void {
    this.userData = new UserData();

    for(let i in Role) {
      if (!isNaN(Number(i))) {
        this.storeRole.push(Role[i]);
      }
    }
  }
  newUser(): void {
    this.UserForm = true;
  }

  saveData(newUserForm: NgForm): void {
    this.userData.role = +Role[this.userData.role];
          newUserForm.reset();
          this.UserForm = false;
  }

  cancelData(newUserForm: NgForm): void {
    newUserForm.reset();
    this.UserForm = false;
  }
}
