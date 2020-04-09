import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms'; 
import { HttpClientModule } from '@angular/common/http';

import { AppComponent } from './app.component';
import { UserTableComponent} from 'src/app/user-table/user-table.component';
import { AddUserComponent } from './add-user/add-user.component'

@NgModule({
  declarations: [
    AppComponent,
    UserTableComponent,
    AddUserComponent
  ],
  imports: [
    BrowserModule,
    FormsModule, 
    HttpClientModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})

export class AppModule { }
