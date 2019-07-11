import { Actions, ofType } from '@ngrx/effects';
import * as AuthActions from './auth.actions';
import { switchMap } from 'rxjs/operators';
import { AuthResponseData } from '../auth.service';
import { HttpClient } from '@angular/common/http';

export interface AuthResponseData {
  kind: string,
  idToken: string,
  email: string,
  refreshToken: string,
  expiresIn: string,
  localId: string,
  registered?: boolean
}
export class AuthEffects {
  authLogin = this.actions$.pipe(
    ofType(AuthActions.LOGIN_START), // only login_start will trigger this
    switchMap((authData: AuthActions.LoginStart) => {
      return this.http
        .post<AuthResponseData>(
          'https://www.googleapis.com/identitytoolkit/v3/relyingparty/verifyPassword?key=AIzaSyCamcdoNDchTMUQS-71VKWSlSdXDktJfBU',
          {
            email: authData.payload.email,
            password: authData.payload.password,
            returnSecureToken: true
          }
        )
    })
  );

  constructor(private actions$: Actions, private http: HttpClient) {}
}