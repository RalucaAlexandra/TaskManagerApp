import { Injectable } from '@angular/core';
import { HttpBackend, HttpClient } from '@angular/common/http';
import {map} from 'rxjs/operators';
import { User } from '../_models/user';
import { Observable, ReplaySubject } from 'rxjs';
import { environment } from 'src/environments/environment';
import { PresenceService } from './presence.service';
import { Member } from '../_models/member';

@Injectable({
  providedIn: 'root'
})
export class AccountService {
  baseUrl = environment.apiUrl;
  private currentUserSource = new ReplaySubject<User>(1);
  currentUser$ = this.currentUserSource.asObservable();
  private httpClient : HttpClient;
  


  constructor(private http: HttpClient, private presence: PresenceService, private httpBackend: HttpBackend) { }

  login(model: any) {
    return this.http.post(this.baseUrl + 'account/login', model).pipe(
      map((response: User) => {
        const user = response;
        if (user) {
          this.setCurrentUser(user);
          this.presence.createHubConnection(user);
        }
      })
    )
  }

  register(model: any) {
    return this.http.post(this.baseUrl + 'account/register', model).pipe(
      map((user: User) => {
        if (user) {
         this.setCurrentUser(user);
         this.presence.createHubConnection(user);
        }
      })
    )
  }

  setCurrentUser(user: User) {
    user.roles = [];
    const roles = this.getDecodedToken(user.token).role;
    Array.isArray(roles) ? user.roles = roles : user.roles.push(roles);
    localStorage.setItem('user', JSON.stringify(user));
    this.currentUserSource.next(user);
  }

  logout() {
    localStorage.removeItem('user');
    this.currentUserSource.next(null);
    this.presence.stopHubConnection();
  }

  getDecodedToken(token) {
    return JSON.parse(atob(token.split('.')[1]));
  }

  getAllEmployees(): Observable<any>
  {
    this.httpClient = new HttpClient(this.httpBackend);
    return this.httpClient.get<any>(this.baseUrl + 'getallemployees', { responseType: "json" });
  }

  
}