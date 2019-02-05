import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { RegisterAdminComponent } from './components/register-admin/register-admin.component';
import { MainMenuComponent } from './components/main-menu/main-menu.component';
import { LoginAdminComponent } from './components/login-admin/login-admin.component';
import { RestorePasswordComponent } from './components/restore-password/restore-password.component';

const routes: Routes = [
  { path: 'register', component: RegisterAdminComponent },
  { path: 'mainmenu', component: MainMenuComponent },
  { path: 'login', component: LoginAdminComponent },
  { path: 'restorePassword', component: RestorePasswordComponent },

  { path: '**', redirectTo: '' }

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }

