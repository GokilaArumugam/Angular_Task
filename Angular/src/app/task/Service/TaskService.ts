import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { TaskModel } from 'src/app/Models/taskModel';
import { APP_CONSTANTS } from 'src/constant/app-constants';
@Injectable({
  providedIn: 'root'
})
export class taskservices {

  constructor(private http:HttpClient) { }

  AddTask(model:TaskModel):Observable<TaskModel>
  {
    return this.http.post<TaskModel>(`${APP_CONSTANTS.SERVICE_BASE_URL}${APP_CONSTANTS.API.TASK}/PostTask`,model);
  }

  UpdateTask(model:TaskModel):Observable<TaskModel>
  {
    return this.http.put<TaskModel>(`${APP_CONSTANTS.SERVICE_BASE_URL}${APP_CONSTANTS.API.TASK}`,model);
  }

  DeleteTask(id:any):Observable<TaskModel>
  {
    return this.http.delete<TaskModel>(`${APP_CONSTANTS.SERVICE_BASE_URL}${APP_CONSTANTS.API.TASK}/${id}`);
  }
  GetAllTask(searchText):Observable<TaskModel[]>
  {
    return this.http.get<TaskModel[]>(`${APP_CONSTANTS.SERVICE_BASE_URL}${APP_CONSTANTS.API.TASK}/?searchText=${searchText}`);
  }
  GetOne(id:any):Observable<TaskModel>
  {
    return this.http.get<TaskModel>(`${APP_CONSTANTS.SERVICE_BASE_URL}${APP_CONSTANTS.API.TASK}/${id}`);
  }
  
}