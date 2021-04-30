import {NgModule} from '@angular/core';
import {Routes, RouterModule} from '@angular/router';
import {LoginComponent} from './login/login.component';
import {StudentComponent} from './student/student.component';

const appRoutes: Routes = [
  {path: 'login', component: LoginComponent},
  {path: 'form', component: StudentComponent},
  {path: '**', redirectTo: '/login',pathMatch:'full'}
];

@NgModule({
  imports: [RouterModule.forRoot(appRoutes)],
  exports: [RouterModule]
})

export class AppRoutingModule {

}
