import { Component, OnInit, Output , EventEmitter} from '@angular/core';
import { UserData } from 'src/app/DataModels/UserData';
import { Role } from 'src/app/DataModels/enum-role';
import { NgForm } from '@angular/forms';
import { CrudService } from 'src/app/CRUD-Service';
@Component({
  selector: 'app-new-user',
  templateUrl: './add-user.component.html',
  styleUrls: ['./add-user.component.css']
})

export class AddUserComponent implements OnInit {
  UserForm: boolean;
  userData: UserData;
  storeRole: string[] = [];
  @Output() onUserAdded=new EventEmitter<{firstName:string , middleName:string ,lastName:string, email:string,phoneNo:number,role:number,address:string}>();
  constructor(private crudService:CrudService) { }

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
          this.UserForm = false;
          console.log(newUserForm.value);
          this.crudService.addUser(this.userData)
          .subscribe(
            response =>{},
            error=>{console.log(error);},
            ()=>{
              this.onUserAdded.emit({firstName:this.userData.firstname , middleName:this.userData.middlename ,lastName:this.userData.lastname, email:this.userData.email,phoneNo:this.userData.phoneno,role:this.userData.role,address:this.userData.address})
              newUserForm.reset();
            })
        }

  cancelData(newUserForm: NgForm): void {
    this.UserForm = false;
    newUserForm.reset();
  }
}
