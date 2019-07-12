import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { catchError, tap } from 'rxjs/operators';
import { throwError } from 'rxjs';
import { User } from './user.model';
import { Router } from '@angular/router';
import { Store } from '@ngrx/store';
import * as fromApp from '../store/app.reducer';
import * as AuthActions from './store/auth.actions';


export interface AuthResponseData {
  kind: string,
  idToken: string,
  email: string,
  refreshToken: string,
  expiresIn: string,
  localId: string,
  registered?: boolean
}

@Injectable({providedIn: 'root'})
export class AuthService {
  // user = new BehaviorSubject<User>(null);
  private tokenExpirationTimer: any;

  constructor(
    private http: HttpClient, 
    private router: Router,
    private store: Store<fromApp.AppState>
  ) {}

  autoLogin() {
    const userData: {
      email: string;
      id: string;
      _token: string;
      _tokenExpirationDate: string;
    } = JSON.parse(localStorage.getItem('userData'));
    
    if (!userData) {
      return; 
    }

    const loadedUser = new User(
      userData.email, 
      userData.id, 
      userData._token, 
      new Date(userData._tokenExpirationDate)
    );

    if (loadedUser.token) {  
      // this.user.next(loadedUser);
      this.store.dispatch(
        new AuthActions.AuthenticateSuccess({
          email: loadedUser.email, 
          userId: loadedUser.id, 
          token: loadedUser.token, 
          expirationDate: new Date(userData._tokenExpirationDate)
        })
      );
      const expirationDuration = 
        new Date(userData._tokenExpirationDate).getTime() - 
        new Date().getTime();
      this.autoLogout(expirationDuration);
    }
  }

  logOut() {
    // this.user.next(null);
    this.store.dispatch(new AuthActions.Logout());
    localStorage.removeItem('userData');
    
    if (this.tokenExpirationTimer) {
      clearTimeout(this.tokenExpirationTimer);
    }
    this.tokenExpirationTimer = null;
  }

  autoLogout(expirationDuration: number) {
    console.log(expirationDuration);
    this.tokenExpirationTimer = setTimeout(() => {
      this.logOut();
    }, expirationDuration);
  }

  private handleAuthentication(
    email: string, 
    userId: string, 
    token: string, 
    expiresIn: number
  ) {
    const expiratoionDate = new Date(
      new Date().getTime() + expiresIn*1000);
    // this.user.next(user);
    const user = new User(email, userId, token, expiratoionDate);
    this.store.dispatch(
      new AuthActions.AuthenticateSuccess({
        email: email, 
        userId: userId, 
        token: token, 
        expirationDate: expiratoionDate
      })
    );
    this.autoLogout(expiresIn * 1000);  // amount in miliseconds
    localStorage.setItem('userData', JSON.stringify(user));
  }

  private handleError(errorRes: HttpErrorResponse) {
    let errorMessage = 'An unknown error occured!';
    if (!errorRes.error || !errorRes.error.error) {
      return throwError(errorMessage);
    }
    switch (errorRes.error.error.message) {
      case 'EMAIL_EXISTS':
        errorMessage = 'This email already exists!';
        break;
      case 'EMAIL_NOT_FOUND':
        errorMessage = 'This email does not exist!';
        break;
      case 'INVALID_PASSWORD':
        errorMessage = 'Password is incorect!';
        break;
    }
    return throwError(errorMessage);
  }
}
