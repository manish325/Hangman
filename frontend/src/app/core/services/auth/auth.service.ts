import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { ICreatePlayer, ICredentials, ILoginResponse, IResponse } from '../../models/auth.models';
import { Observable } from 'rxjs';
import { API_ENDPOINTS } from '../../enums/api-endpoints';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor(private http : HttpClient, private router : Router) { }

  login(credentials : ICredentials)  : Observable<ILoginResponse>{
    return this.http.post(API_ENDPOINTS.login, credentials) as Observable<ILoginResponse>;
  }

  createPlayer(userDetails : ICreatePlayer)  {
    return this.http.post(API_ENDPOINTS.createPlayer, userDetails)
  }

  getToken() : string {
    return localStorage.getItem('token') || ''
  }

  setUserDetails(userDetails : ICreatePlayer) {
    if(!localStorage.getItem('userDetails')) {
      localStorage.setItem('userDetails', JSON.stringify(userDetails))
    }
  }

  getUserDetails() : ICreatePlayer | null {
    const userDetails = localStorage.getItem('userDetails');
    if(userDetails)
    return JSON.parse(userDetails)
    return null;
  }

  setCurrentRole(role : string) {
    localStorage.setItem('currentRole', role);
  }

  getCurrentRole() : string {
    return localStorage.getItem('currentRole') || '';
  }

  setToken(token : string) {
    localStorage.setItem('token', token);
  }

  logout() {
    localStorage.clear();
    this.router.navigate([''])
  }
}
