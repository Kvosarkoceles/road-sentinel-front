import { Injectable } from '@angular/core';
import { HttpClient, HttpResponse } from "@angular/common/http";
import {BehaviorSubject, Observable} from "rxjs";
import { User } from 'src/app/models/user';
import { environment } from 'src/app/environments/environment';
import { tap } from 'rxjs/operators';
import { Router } from '@angular/router'; 



@Injectable({
  providedIn: 'root',
})
export class UsersService {
  private loggedIn = new BehaviorSubject<boolean>(false);
  isLoggedIn$ = this.loggedIn.asObservable();

  constructor(private http: HttpClient) { }

  login(email: string): Observable<any> {
    const requestBody = { email: email };
    const sessionLogin = this.http.post(
      `${environment.api}/auth/request-otp`,
      requestBody,
      {
        headers: {
          'Content-Type': 'application/json'
        }
      }
    );
    return sessionLogin;
  }

  verifyOtp(email: string, otp: string, session: string): Observable<any> {
    const requestBody = {
      email: email,
      otp: otp,
      session: session
    };

    return this.http.post(
      `${environment.api}/auth/login`,
      requestBody,
      {
        headers: {
          'Content-Type': 'application/json',
          'Accept': '*/*'
        }
      }
    ).pipe(
      tap(response => {
        // Verifica si existe accessToken en la respuesta
        if (response && response.idToken) {
          // Decodifica el token
          const decodedToken = this.decodeToken(response.idToken);
          
          // // Almacena el token (opcional)
          this.setToken(response.accessToken);

          // // Establece el estado de loggedIn a true
          this.setLoggedIn(true);
        }
      })
    );
  }



  setToken(token : string) {
    localStorage.setItem('access_token', token);
  }

  getToken() : string {
    return localStorage.getItem('access_token') ?? '';
  }

  removeToken() {
    localStorage.removeItem('access_token');
  }

  canActivate() : boolean {
    const token = this.getToken();
    if(!token || token === '') return false;
    if(this.isTokenValid(token)) {
      return true;
    } else {
        this.removeToken();
        return false;
    }
  }

  decodeToken(token : string) : any {
    const base64Url = token.split(".")[1];
    const base64 = base64Url.replace("-", "+").replace("_", "/");
    return JSON.parse(window.atob(base64));
  }

  isTokenExpired(token : string) : boolean {
    const decodedToken = this.decodeToken(token);
    const now = Date.now().valueOf() / 1000;
    return decodedToken.exp < now;
  }

  isTokenValid(token: string) {
    if(!token || token === '') return false;
    return !this.isTokenExpired(token);
  }

  setLoggedIn(value : boolean) {
    this.loggedIn.next(value);
  }

  logout() {
    this.removeToken();
    this.setLoggedIn(false);
  }

  getUsers() : Observable<any> {
    return this.http.get(environment.api+"/users/all");
  }
}
