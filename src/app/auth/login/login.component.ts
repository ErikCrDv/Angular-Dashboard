import { Component, AfterViewInit, ViewChild, ElementRef, NgZone } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
//
import Swal from 'sweetalert2';
//
import { UserService } from 'src/app/services/user.service';
//
declare const google: any;

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements AfterViewInit {

  //
  @ViewChild('GoogleBtn') googleBtn!: ElementRef;

  //
  private formSubmitted: boolean = false;
  public loginForm: FormGroup = this.formBuilder.group({
    email:     [ localStorage.getItem('email') || '', [ Validators.required, Validators.email ]], // Erik@CrDv.com
    password:  [ '',        [ Validators.required ]], // 123456
    remember:  [ false ]
  })

  //
  constructor(
    private router: Router,
    private formBuilder: FormBuilder,
    private userService: UserService,
    private ngZone: NgZone
  ) { }
  
  ngAfterViewInit(): void {
    this.googleInit();
  }

  //
  googleInit(){
    google.accounts.id.initialize({
      client_id: "44994662542-doib0svjd6r5os3n78s3a4pho209t03m.apps.googleusercontent.com",
      callback: (response: any) => this.handleCredentialResponse( response )
    });
    google.accounts.id.renderButton(
      this.googleBtn.nativeElement,
      { theme: "outline", size: "large" }  // customization attributes
    );
    // google.accounts.id.prompt(); // also display the One Tap dialog
  }
  handleCredentialResponse( response: any ){
    // console.log("Encoded JWT ID token: " + response.credential);
    this.userService.loginGoogle( response.credential )
      .subscribe( res => {
        // console.log('Login', res );
        this.ngZone.run( () =>{
          this.router.navigateByUrl('/');
        });
      });
  }

  //
  login(){
    // console.log( this.loginForm.value );
    this.userService.login( this.loginForm.value )
      .subscribe( 
        (res) => {
          if( this.loginForm.get('remember')?.value ){
            localStorage.setItem('email', this.loginForm.get('email')?.value );
          }else{
            localStorage.removeItem('email');
          }

          this.router.navigateByUrl('/');
        }, 
        (error) => {
          console.log(error.error.msg)
          Swal.fire('Error', error.error.msg, 'error' );
        } 
      );
  }

}
