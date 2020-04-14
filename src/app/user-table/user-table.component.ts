import { Component, OnInit, Input } from '@angular/core';
import { CrudService } from 'src/app/CRUD-Service';
import { Role } from 'src/app/DataModels/enum-role';
import {UserData} from 'src/app/DataModels/UserData';
import * as cloneDeep from 'lodash/cloneDeep';
import { AddUserComponent} from 'src/app/add-user/add-user.component';
@Component({
  selector: 'app-user-table',
  templateUrl: './user-table.component.html',
  styleUrls: ['./user-table.component.css']
})
export class UserTableComponent implements OnInit {
Role=Role;
displayData:boolean;
buttonName:string;
column:string[]=[];
@Input() userData:UserData[]=[];
editBtn:string[]=[];
deleteBtn:string[]=[];
editEnable:boolean[]=[];
copyData:UserData[]=[];
storeRole:string[]=[];
  constructor(private crudService: CrudService) { }

  ngOnInit(): void {
    this.displayData=false;
    this.buttonName="LOAD DATA";
    this.column=["First Name", "Middle Name", "Last Name", "E-mail", "Phone Number","Role", "Address", "Edit", "Delete"];
   for(let i in Role) {
      if (!isNaN(Number(i))) {
        this.storeRole.push(Role[i]);
      }
    }
  }
loadUserTable()
{
  this.displayData=true;
  this.buttonName="REFRESH DATA";
  this.crudService.fetchUser()
  .subscribe(response => {
    console.log(response);
     this.userData = response;
     this.copyData=cloneDeep(response); 
  },
  error => {
    console.log("Error ", error);
  },
  () => {
    for(let i in this.userData) {
    this.editBtn[i]='Edit';
    this.deleteBtn[i]='Delete';
    this.editEnable[i] = false;
    }
    });
  }
  deleteData(row: number, btn: HTMLTableCellElement){
    if(this.deleteBtn[row]=='Delete')
    {
      this.crudService.delete(this.userData[row].empid)
      .subscribe(response => {
      },error =>{
        console.log(error);
      },
      () => {
        this.userData.splice(row, 1);
        this.editEnable.splice(row, 1);
        this.editBtn.splice(row, 1);
        this.deleteBtn.splice(row, 1);
      });
    }
    else{
      this.cancelData(row,btn);
    }
  }
  editData(row: number, btn : HTMLTableCellElement){
    if(this.editBtn[row]=='Edit')
    {
      this.editEnable[row]=true;
      this.editBtn[row]='Save';
      this.deleteBtn[row]='Cancel';
    }
    else{
      this.saveData(row,btn);
    }
  }
  saveData(row: number, btn : HTMLTableCellElement)
  {
   if(this.editBtn[row]=='Save'){
     this.crudService.update(this.userData[row])
     .subscribe(response => {},
      error =>{console.log(error)},
      ()=>{
        this.editBtn[row]='Edit';
        this.deleteBtn[row]='Delete';
        this.editEnable[row] = false;
        //console.log(this.userData[row]);
        this.copyData[row]=cloneDeep(this.userData[row]);
      });
   }
  }
  cancelData(row: number, btn : HTMLTableCellElement)
  {
    if(this.deleteBtn[row]=='Cancel')
    {
      this.editBtn[row]='Edit';
      this.deleteBtn[row]='Delete';
      this.editEnable[row] = false;
     // console.log(this.copyData[row]);
      this.userData[row]=cloneDeep(this.copyData[row]);
    }
  }
  changeRole(row: number, selectTag: HTMLSelectElement) {
    this.userData[row].role = +selectTag.value;
  }
  userAdded(addedUser:{firstName:string , middleName:string ,lastName:string, email:string,phoneNo:number,role:number,address:string})
  {
   // console.log(addedUser);
    this.userData.push({empid:0,
      firstname: addedUser.firstName,
      middlename: addedUser.middleName,
      lastname: addedUser.lastName,
      email: addedUser.email,
      phoneno: addedUser.phoneNo,
      role: addedUser.role,
      address: addedUser.address});
      //console.log(this.userData.length);
      this.editBtn[(this.userData.length)-1]="Edit";
      this.deleteBtn[(this.userData.length)-1]="Delete";
  } 
  
}

