import { Component, OnInit } from '@angular/core';
import {TaskModel} from '../Models/taskModel';
import { NgForm } from '@angular/forms';
import { taskservices } from './Service/TaskService';
import{faEdit,faTrashAlt,faUser,faSort,faDeleteLeft}from '@fortawesome/free-solid-svg-icons'
import Swal from 'sweetalert2';
import { ToastrService } from 'ngx-toastr';
import  * as moment from 'moment';

@Component({
  selector: 'app-task',
  templateUrl: './task.component.html',
  styleUrls: ['./task.component.scss']
})
export class TaskComponent implements OnInit{
  faSort=faSort;
  faEdit=faEdit;
  faTrashAlt=faTrashAlt;
  faUser=faUser;
  faDeleteLeft=faDeleteLeft;
  isTittle:boolean=false;
  usersList:TaskModel[]=[];
  users:TaskModel;
  isEdit:boolean=false;
 task: TaskModel=new TaskModel();
 
 searchText:any = " ";
 

 switchstatus:string='';

constructor(private tservice:taskservices,private toastr:ToastrService){} 

    
    
 onSubmit(form:NgForm)
 {
     console.log(form.value);
     this.tservice.AddTask(this.task).subscribe(res=>
      {
        this.toastr.success("Task Added Successful");
        console.log(res);
      form.resetForm();
      this.getAll();
    })
 }

  SubmitUpdateTask(){
       this.tservice.UpdateTask(this.task).subscribe(res=>{
      console.log(res);
      this.getAll();
    })
  } 
 
  
  getAll(){
    this.searchText = this.searchText === " " ? null : this.searchText;
    this.tservice.GetAllTask(this.searchText).subscribe(res=>{
      this.usersList=res;
    })
  }
  ngOnInit(){
    this.getAll();
  }
  edit(data:TaskModel)
  {
   this.task=data;
   let date=moment(data.date).format('YYYY-MM-DD');
   this.task.date=date;

   /* let fulldate = new Date(data.date);
   let date = fulldate.getDate();
   let month  = fulldate.getMonth() + 1;
   month = fulldate.getMonth();
   let year = fulldate.getFullYear();
   let modifiedDate = year + "-" + month + "-" + date;
   this.task.date = modifiedDate;  */
}
    delete(model:TaskModel)
   {
     Swal.fire({
      title: 'Are you sure want to Delete?',
      text: 'You will not be able to recover this task!',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonText: 'Yes, delete it!',
      cancelButtonText: 'No, keep it'
    }).then((result) => {
      if (result.value) {
        this.tservice.DeleteTask(model.id).subscribe(res=>{
          this.getAll();
        })
        Swal.fire(
          'Deleted!',
          'Your task has been deleted.',
          'success'
        )
      } else if (result.dismiss === Swal.DismissReason.cancel) {
        Swal.fire(
          'Cancelled',
          'Your task is safe :)',
          'error'
        )
      }
    })
     
  }

  }


