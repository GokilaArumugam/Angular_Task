import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { QuerryModel } from 'src/app/Models/querryModel';
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
  GetAllTask(querryModel:QuerryModel):Observable<any>
  {
    let params = new HttpParams();
    params = querryModel.description ? params.append('description',querryModel.description) : params;
    params = querryModel.date ? params.append('date',querryModel.date) : params;
    params =querryModel.status ? params.append('status', querryModel.status) : params;
    params =querryModel.sortby ? params.append('sortby', querryModel.sortby) : params;
    params =querryModel.isDesc ? params.append('isDesc', querryModel.isDesc) : params;
    return this.http.get<any>(`${APP_CONSTANTS.SERVICE_BASE_URL}${APP_CONSTANTS.API.TASK}`,{ params: params });
  }
  GetOne(id:any):Observable<TaskModel>
  {
    return this.http.get<TaskModel>(`${APP_CONSTANTS.SERVICE_BASE_URL}${APP_CONSTANTS.API.TASK}/${id}`);
  }
  
}