import { Component, OnInit } from '@angular/core';
import { FormGroup,FormControl,Validator, Validators, RequiredValidator,FormBuilder } from '@angular/forms';
import { RegisterModel } from 'src/app/Models/registerModel';
import { AuthService } from '../Service/auth.service';
import{faUser,faCalendar,faEnvelope,faEye,faEyeSlash,faLock} from '@fortawesome/free-solid-svg-icons'
import { ToastrModule, ToastrService } from 'ngx-toastr';
import { Route, Router } from '@angular/router';

@Component({
  selector: 'app-registration',
  templateUrl: './registration.component.html',
  styleUrls: ['./registration.component.scss']
})
export class RegistrationComponent implements OnInit {
 faUser=faUser;
faEye=faEye;
faCalender=faCalendar;
faEnvelope=faEnvelope;
faEyeSlash=faEyeSlash;
faLock=faLock;
hide=true;
  constructor(private formBuilder:FormBuilder,private service: AuthService,private toastr:ToastrService,private route:Router)
  {}
 
 registerForm: FormGroup;
registerModel=new  RegisterModel();
 ngOnInit(){
  this.registerForm=this.formBuilder.group({
    name:['',[Validators.required,
        Validators.minLength(2)]],
    age:['',
      [Validators.required,
      ]],
    email:['',[Validators.required,Validators.email
    ]],
    password:['',[Validators.required,Validators.minLength(8),Validators.maxLength(15)]],
  });
    
 }

 Onsubmit()
 {
   this.registerModel.name=this.registrationFormControls['name'].value;
   this.registerModel.age= this.registrationFormControls['age'].value;
   this.registerModel.email=this.registrationFormControls['email'].value;
   this.registerModel.password=this.registrationFormControls['password'].value;
   this.service.Register(this.registerModel).subscribe(
      (res:any) => {
        if(res?.result>0){
          this.toastr.success("Register Successful");
          this.route.navigate(["/login"]);
      }
      (err) => {
         this.toastr.error(err?.error?.message);
      }
 });
 }

get registrationFormControls(){
  return this.registerForm.controls;
}

}