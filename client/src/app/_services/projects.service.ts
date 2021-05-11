import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { environment } from 'src/environments/environment';
import { Project } from '../_models/project';

@Injectable({
  providedIn: 'root'
})
export class ProjectsService {
  baseUrl = environment.apiUrl;

  constructor(private httpClient: HttpClient) { }

  getAllProjects(): Observable<Project[]> 
  {
    return this.httpClient.get<Project[]>(this.baseUrl + 'projects', { responseType: 'json' });
  }

  insertProject(newProject: Project) : Observable<Project>
  {
    return this.httpClient.post<Project>(this.baseUrl + 'projects', newProject, {responseType: "json"});
  }

  updateProject(existingProject: Project) : Observable<Project>
  {
    return this.httpClient.put<Project>(this.baseUrl +'projects/?ProjectID=' + existingProject.projectID , existingProject, {responseType: "json"});
  }

  deleteProject(ProjectID: number) : Observable<string>
  {
    return this.httpClient.delete<string>(this.baseUrl +'projects/?ProjectID=' + ProjectID);
  }
}
