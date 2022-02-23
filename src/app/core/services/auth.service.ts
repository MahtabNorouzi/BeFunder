import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { User } from '../models/user';


@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private _user: BehaviorSubject<User>;

  constructor(private http: HttpClient) {
    this._user = new BehaviorSubject<User>(JSON.parse(sessionStorage.getItem('panelLoginUser') || localStorage.getItem('panelLoginUser')));
  }

  login(username: string, password: string) {
    return this.http.post<any>(`http://localhost:3000/auth/login`, { username, password })
      .pipe(map(user => {
        localStorage.setItem('panelLoginUser', JSON.stringify(user));
        this._user.next(user);
        return user;
      }));
  }

  register(user:User) {
    return this.http.post<any>(`http://localhost:3000/auth/register`, user)
      .pipe(map(user => {
        return this.login(user.username, user.password);
      }));
  }

  logout() {
    localStorage.removeItem('panelLoginUser');
    this._user.next(null);
  }

  get user() {
    return new Observable(fn => this._user.subscribe(fn));
  }

  get token() {
    return this._user.value["access_token"];
  }

  get instantUser() {
    return this._user.value;
  }
}