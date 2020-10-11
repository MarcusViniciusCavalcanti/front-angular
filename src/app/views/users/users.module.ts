import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { UsersRoutingModule } from './users-routing.module';
import { AllUsersComponent } from './all-users/all-users.component';
import { NewUserComponent } from './new-user/new-user.component';



@NgModule({
  declarations: [AllUsersComponent, NewUserComponent],
  imports: [
      CommonModule,
      UsersRoutingModule
  ]
})
export class UsersModule { }
