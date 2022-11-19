import { Component, OnDestroy, OnInit } from '@angular/core';
import { Observable, interval, Subscription } from 'rxjs';
import { filter, map, retry, take } from 'rxjs/operators';

@Component({
  selector: 'app-rxjs',
  templateUrl: './rxjs.component.html',
  styles: [
  ]
})
export class RxjsComponent implements OnInit, OnDestroy {

  interSubs: Subscription;

  constructor() { 

    this.interSubs = this.returnInter().subscribe(
      valor => console.log('Subs', valor ),
      error => console.warn('Error', error),
      () => console.info('OBS COMPLETED')
    );

    // this.returnObs().pipe(
    //   retry()
    // ).subscribe(
    //   valor => console.log('Subs', valor ),
    //   error => console.warn('Error', error),
    //   () => console.info('OBS COMPLETED')
    // );

  }
  ngOnDestroy(): void {
    this.interSubs.unsubscribe();
  }

  ngOnInit(): void {
  }

  returnInter(): Observable<number>{
    return interval( 1 )
            .pipe(
              map( value => value + 1 ),
              filter( value => value % 2 != 1 ),
              // take( 50 )
            )
  }

  returnObs(): Observable<number> {
    let i = 0;
    return new Observable<number>( observer => {
      
      const inter = setInterval( () => {
        observer.next( i );
        
        if( i === 4 ){
          clearInterval( inter );
          observer.complete();
        }
        
        if( i === 2 ){
          observer.error('Obs reach 2');
        }

        i++;
      }, 1000 )
      
    });
  }
}
