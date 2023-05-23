import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { LoginModel } from 'src/app/Models/loginModel';
import { RegisterModel } from 'src/app/Models/registerModel';
import { TaskModel } from 'src/app/Models/taskModel';
import { APP_CONSTANTS } from 'src/constant/app-constants';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
   

  constructor(private http:HttpClient) { }

  
  login(model: LoginModel) {

        return this.http.post(`${APP_CONSTANTS.SERVICE_BASE_URL}${APP_CONSTANTS.API.USER}/PostUser`,model);
    }
    Register(model:RegisterModel)
    {
        return this.http.post(`${APP_CONSTANTS.SERVICE_BASE_URL}${APP_CONSTANTS.API.USER}/RegisterUser`,model);
    }
    UpdatePassword(model:RegisterModel)
    {
      return this.http.put(`${APP_CONSTANTS.SERVICE_BASE_URL}${APP_CONSTANTS.API.USER}/UpdatePassword`,model);
    }
}
