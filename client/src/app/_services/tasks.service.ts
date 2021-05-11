import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { Task } from '../_models/task';

@Injectable({
  providedIn: 'root'
})
export class TasksService {
  baseUrl = environment.apiUrl;

  constructor(private httpClient: HttpClient)
  {
  }

  insertTask(newTask: Task): Observable<Task>
  {
    return this.httpClient.post<Task>(this.baseUrl + 'createtask', newTask, { responseType: "json" });
  }



}
