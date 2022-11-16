import { Component } from '@angular/core';

@Component({
  selector: 'app-grafica1',
  templateUrl: './grafica1.component.html',
  styles: [
  ]
})
export class Grafica1Component {

  Name: string = 'Ventas';
  Labels: string[] = [ 'Ventas en Campo', 'Ventas en Tienda', 'Ventas Online' ];
  Color: string[] = [ '#DAF7A6', '#FFC300', '#FF5733' ];
  Datasets: number[] = [ 500, 300, 100 ];
  

}
