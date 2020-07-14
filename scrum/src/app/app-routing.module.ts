import { UpdateProfileComponent } from 'src/app/modules/update-profile/update-profile.component';
import { DashboardComponent } from './modules/dashboard/dashboard.component';
import { ScrumComponent } from './layouts/scrum/scrum.component';
import { AuthComponent } from './auth/auth.component';
import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { WelcomeComponent } from './welcome/welcome.component';
import { ProjectComponent } from './modules/project/project.component';


const routes: Routes = [
  { path: '', component:WelcomeComponent},
  {path : 'auth', component: AuthComponent},
  {path:'scrum', component:ScrumComponent, children : [
    {path:'', component: DashboardComponent},
    {path:'project', component: ProjectComponent},
    {path:'update-profil', component: UpdateProfileComponent},


  ]}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
