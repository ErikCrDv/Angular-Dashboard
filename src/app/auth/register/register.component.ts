import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
//
import Swal from 'sweetalert2'
//
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent {

  private formSubmitted: boolean = false;
  public registerForm = this.formBuilder.group({
    name:      [ 'Erik',          [ Validators.required ]],
    email:     [ 'Erik@CrDv.com', [ Validators.required, Validators.email ]],
    password:  [ '123456',        [ Validators.required ]],
    password2: [ '123456',         [ Validators.required ]],
    terms:     [ true,           [ Validators.required ]],
  }, {
    validators: this.matchPassword('password', 'password2')
  })

  constructor(
    private formBuilder: FormBuilder,
    private userService: UserService,
    private router: Router
  ) { }
  
  createUser(){
    this.formSubmitted = true;
    // console.log( this.registerForm.value );

    //
    if( this.registerForm.invalid ) 
      return;

    //
    this.userService.createUser( this.registerForm.value )
      .subscribe( 
        (res) => {
        console.log( res );
        this.router.navigateByUrl('/');
        }, 
        (error) => {
          // console.log(error.error.msg)
          Swal.fire('Error', error.error.msg, 'error' );
        } 
      );
  }

  chekFieldValid( field: string ): boolean {  
    if ( this.registerForm.get( field )?.invalid  &&  this.formSubmitted ) 
      return true
    else
      return false;
  }

  checkPasswordMatch(): boolean {
    const pass1 = this.registerForm.get( 'password' )?.value;
    const pass2 = this.registerForm.get( 'password2' )?.value;

    if( ( pass1 !== pass2 ) && this.formSubmitted ){
      return true;
    }

    return false;
  }

  acceptTerms(): boolean {
    return !this.registerForm.get('terms')?.value && this.formSubmitted
  }
  
  matchPassword( pass1Name: string, pass2Name: string ){
    return ( formGroup: FormGroup ) => {
      const pass1Control = formGroup.get( pass1Name );
      const pass2Control = formGroup.get( pass2Name );

      if( pass1Control?.value === pass2Control?.value ){
        pass2Control?.setErrors(null);
      }else{
        pass2Control?.setErrors({ noMatch: true });
      }

    }

  }

}