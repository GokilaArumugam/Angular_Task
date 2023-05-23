import { Component, OnInit, ViewChild } from '@angular/core';
import { NgForm } from '@angular/forms';
import { LoginModel } from 'src/app/Models/loginModel';
import { AuthService } from '../Service/auth.service';
import{faEnvelope,faEye,faEyeSlash,faLock} from '@fortawesome/free-solid-svg-icons'
import { ToastrService } from 'ngx-toastr';
import { Router } from '@angular/router';
import { HeaderComponent } from 'src/app/sharedmodule/header/header.component';
@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
})
export class LoginComponent{
faEye=faEye;
faEnvelope=faEnvelope;
faEyeSlash=faEyeSlash;
faLock=faLock;
hide=true;
username: string;
  loginModel: LoginModel = new LoginModel();
  constructor(private service: AuthService,private toastr:ToastrService,private route:Router) {}
  
     
  OnSubmit() {
   
    this.service.login(this.loginModel).subscribe(
      (res:any) => {
        const loggedInUser=res?.users;
        localStorage.setItem('loggedInUser',JSON.stringify(loggedInUser));
       this.toastr.success("login Successful");
       this.route.navigate(["/task"])
      },
      (err) => {
        this.toastr.error("User Not Found");
        this.route.navigate(["/registration"]);
      }
    );

    
  }
}
