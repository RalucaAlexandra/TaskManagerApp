import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { GroupedTask } from '../_models/groupedTask';
import { Task } from '../_models/task';
import { TaskStatusDetail } from '../_models/taskStatusDetail';

@Injectable({
  providedIn: 'root'
})
export class TasksService {
  baseUrl = environment.apiUrl;

  constructor(private httpClient: HttpClient)
  {
  }
  
  getTasks() : Observable<GroupedTask[]>
  {
    return this.httpClient.get<GroupedTask[]>(this.baseUrl + 'tasks', { responseType: "json" });
  }

  getTaskByTaskID(TaskID: number) : Observable<Task>
  {
    return this.httpClient.get<Task>(this.baseUrl + 'tasks/searchbytaskid/' + TaskID, { responseType: "json" });
  }

  updateTaskStatus(taskStatusDetail: TaskStatusDetail) : Observable<TaskStatusDetail>
  {
    return this.httpClient.put<TaskStatusDetail>(this.baseUrl + 'updatetaskstatus', taskStatusDetail, { responseType: "json" });
  }



  insertTask(newTask: Task): Observable<Task>
  {
    return this.httpClient.post<Task>(this.baseUrl + 'createtask', newTask, { responseType: "json" });
  }
  



}