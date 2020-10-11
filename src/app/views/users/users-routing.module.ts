import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AllUsersComponent } from './all-users/all-users.component';
import { NewUserComponent } from './new-user/new-user.component';

const routes: Routes = [
  {
    path: '',
    data: {
      title: 'Usuários'
    },
    children: [
      {
        path: '',
        redirectTo: 'all'
      },
      {
        path: 'all',
        component: AllUsersComponent,
        data: {
          title: 'Todos'
        },
      },
      {
        path: 'new',
        component: NewUserComponent,
        data: {
          title: 'Novo Usuário'
        },
      }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class UsersRoutingModule {}
