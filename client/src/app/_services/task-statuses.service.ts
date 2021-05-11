import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { TaskStatus } from '../_models/taskStatus';

@Injectable({
  providedIn: 'root'
})
export class TaskStatusesService
{

  baseUrl = environment.apiUrl;
  constructor(private httpClient: HttpClient)
  {
  }

  getTaskStatuses(): Observable<TaskStatus[]>
  {
    return this.httpClient.get<TaskStatus[]>(this.baseUrl + 'taskstatuses', { responseType: "json" });
  }

  insertTaskStatus(newTaskStatus: TaskStatus): Observable<TaskStatus>
  {
    return this.httpClient.post<TaskStatus>(this.baseUrl + 'taskstatuses', newTaskStatus, { responseType: "json" });
  }

  updateTaskStatus(existingTaskStatus: TaskStatus): Observable<TaskStatus>
  {
    return this.httpClient.put<TaskStatus>(this.baseUrl +'taskstatuses', existingTaskStatus, { responseType: "json" });
  }

  deleteTaskStatus(TaskStatusID: number): Observable<string>
  {
    return this.httpClient.delete<string>(this.baseUrl +'taskstatuses/?TaskStatusID=' + TaskStatusID);
  }


}
