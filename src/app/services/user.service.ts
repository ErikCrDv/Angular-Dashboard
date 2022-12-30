import { HttpClient } from '@angular/common/http';
import { Injectable, NgZone } from '@angular/core';
import { environment } from 'src/environments/environment';
import { Router } from '@angular/router';
//
import { catchError, map, Observable, of, tap  } from 'rxjs';
//
import { LoginForm } from '../interfaces/login-from.interface';
import { RegisterForm } from '../interfaces/register-from.interface';
//
declare const google: any;
//
const base_url = environment.base_url;

@Injectable({
  providedIn: 'root'
})
export class UserService {

  constructor(
    private http: HttpClient,
    private router: Router,
    private ngZone: NgZone
    ) { }

  public createUser( formData: RegisterForm ){
    return this.http.post( `${ base_url }/users`, formData )
      .pipe(
        tap( ( res: any ) => {
          localStorage.setItem('token', res.token )
        })
      );
  }

  public login( formData: LoginForm ){
    return this.http.post( `${ base_url }/auth/login`, formData )
      .pipe(
        tap( ( res: any ) => {
          localStorage.setItem('token', res.token )
        })
      );
  }

  public loginGoogle( token: string ){
    return this.http.post( `${ base_url }/auth/login/google`, { token } )
      .pipe(
        tap( ( res: any ) => {
          localStorage.setItem('token', res.JWtoken )
        })
      );
  }

  verifyToken():  Observable<boolean>{
    const token = localStorage.getItem('token') || ''; 
    return this.http.get(`${ base_url }/auth/login/renew`, {
      headers: { 'x-token': token }
    })
      .pipe(
        tap( (res:any) => {
          localStorage.setItem('token', res.token )
        }),
        map( res => true ),
        catchError( error => of(false) )
      )
  }

  logout(){
    localStorage.removeItem('token');
    google.accounts.id.revoke('maggot12e@gmail.com', () =>{
      this.ngZone.run( () =>{
        this.router.navigateByUrl('/login');
      });
    })
  }

}
 