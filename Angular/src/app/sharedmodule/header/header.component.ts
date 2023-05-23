import { Component, OnInit, ViewChild } from '@angular/core';
import { Route, Router } from '@angular/router';

import { RegisterModel } from 'src/app/Models/registerModel';
import { AuthService } from 'src/app/authentication/Service/auth.service';
import{faEnvelope,faEye,faEyeSlash,faLock,faCalendar,faUser} from '@fortawesome/free-solid-svg-icons'
import { ToastrService } from 'ngx-toastr';
@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit{
 btn:boolean=false;
loggedInUser:RegisterModel;
 
loginModel:RegisterModel=new  RegisterModel();
updateModel:RegisterModel=new RegisterModel();
faEye=faEye;
faUser=faUser;
faCalendar=faCalendar;
faEnvelope=faEnvelope;
faEyeSlash=faEyeSlash;
faLock=faLock;
hide=true;
@ViewChild('myModal') public myModal;


  constructor(private authService: AuthService,private route:Router,private toastr:ToastrService) { }
 ngOnInit() {
    this.loggedInUser = JSON.parse(localStorage.getItem("loggedInUser"));
    console.log(this.loggedInUser);
    this.updateModel=this.loggedInUser;
  }
  LogOut(){
    localStorage.removeItem("loggedInUser");
    this.loggedInUser=null;
    this.route.navigate(["/starting-page"]);
  }

  OnSubmit() {
    this.authService.UpdatePassword(this.updateModel).subscribe(
     ( res:any)=>{
        this.toastr.success("Change Profile Successful");
        localStorage.setItem("loggedInUser",JSON.stringify(this.updateModel));
        this.myModal.hide();
      },
      (err)=>{
        this.toastr.error("Provided Email Not Found");
      });

  }
}
