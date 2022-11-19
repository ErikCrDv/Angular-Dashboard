import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-promise',
  templateUrl: './promise.component.html',
  styles: [
  ]
})
export class PromiseComponent implements OnInit {

  constructor() { }

  ngOnInit(): void {

    this.getUsers().then( users => { 
      // console.log( users );
    });
    // const promise = new Promise( ( resolve, reject ) => {
    //   if( false ) resolve('My Resolve');
    //   else reject('My Reject')
    // });
    
    // promise
    //   .then( console.log )
    //   .catch( console.log )
    // ;

    // console.log('Hola Mundo');
  }
  
  getUsers(){
    return new Promise( ( resolve, reject ) => {
      fetch('https://reqres.in/api/user')
        .then( res => res.json() )
        .then( body => resolve( body.data ));
    });
  }
}
