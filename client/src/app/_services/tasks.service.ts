import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { GroupedTask } from '../_models/groupedTask';
import { Task } from '../_models/task';

@Injectable({
  providedIn: 'root'
})
export class TasksService {
  baseUrl = environment.apiUrl;

  constructor(private httpClient: HttpClient)
  {
  }
  
  getTasks() : Observable<Task[]>
  {
    return this.httpClient.get<Task[]>(this.baseUrl + 'tasks', { responseType: "json" });
  }


  insertTask(newTask: Task): Observable<Task>
  {
    return this.httpClient.post<Task>(this.baseUrl + 'createtask', newTask, { responseType: "json" });
  }
  



}