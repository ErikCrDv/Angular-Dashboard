import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';

@Component({
  selector: 'app-incrementer',
  templateUrl: './incrementer.component.html',
  styles: [
  ]
})
export class IncrementerComponent implements OnInit  {
  
  ngOnInit(): void {
    this.btnClass = `btn ${ this.btnClass }`;
  }

  @Input('progressValue') progress: number = 20;
  @Input() btnClass: string = 'btn-primary';

  @Output() progressChangeValue: EventEmitter<number> = new EventEmitter();

  changeValue( value: number ){
    if( this.progress >= 100 && value >= 0){
      this.progressChangeValue.emit(100);
      return this.progress = 100;
    }
    if( this.progress <= 0 && value < 0){
      this.progressChangeValue.emit(0);
      return this.progress = 0;
    }
    
    this.progressChangeValue.emit(this.progress + value);
    return this.progress = this.progress + value;
  }
  
  onChange( newValue: number ){
    newValue >= 100
      ? this.progress = 100
      : newValue <= 0 
        ? this.progress = 0
        : this.progress = newValue;
        
    this.progressChangeValue.emit( this.progress );
  }

}
