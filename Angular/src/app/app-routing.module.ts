import{NgModule} from '@angular/core';
import{RouterModule,Routes} from '@angular/router';
import { LoginComponent } from './authentication/login/login.component';
import { RegistrationComponent } from './authentication/registration/registration.component';
import { TaskComponent } from './task/task.component';

const routes: Routes = [
  {path:"",redirectTo:"contents",pathMatch:"full"},
  {path:"authentication",
  loadChildren:()=>import("../app/authentication/authentication.module")
  .then(m=>m.AuthenticationModule)},      
   {path:"contents",loadChildren:()=>import("../app/contents/contents.module").then(m=>m.ContentsModule)},  
   {path:'task',component:TaskComponent}, 
   {path:'login',component:LoginComponent}    ,
   {path:'registration',component:RegistrationComponent}

];
@NgModule({
 
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule{

}