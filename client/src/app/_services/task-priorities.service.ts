import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

import { HttpClient } from '@angular/common/http';
import { TaskPriority } from '../_models/taskPriority';
import { environment } from 'src/environments/environment';


//apiUrl: 'https://localhost:5001/api/', 

@Injectable({
  providedIn: 'root'
})
export class TaskPrioritiesService
{
  baseUrl = environment.apiUrl;

  constructor(private httpClient: HttpClient)
  {
  }

  getTaskPriorities(): Observable<TaskPriority[]>
  {
    return this.httpClient.get<TaskPriority[]>(this.baseUrl + 'taskpriorities', { responseType: "json" });
  }

  insertTaskPriority(newTaskPriority: TaskPriority): Observable<TaskPriority>
  {
    return this.httpClient.post<TaskPriority>(this.baseUrl + 'taskpriorities', newTaskPriority, { responseType: "json" });
  }

  updateTaskPriority(existingTaskPriority: TaskPriority): Observable<TaskPriority>
  {
    return this.httpClient.put<TaskPriority>(this.baseUrl +'taskpriorities', existingTaskPriority, { responseType: "json" });
  }

  deleteTaskPriority(TaskPriorityID: number): Observable<string>
  {
    return this.httpClient.delete<string>(this.baseUrl +'taskpriorities/?TaskPriorityID=' + TaskPriorityID);
  }
}
