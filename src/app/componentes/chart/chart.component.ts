import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-chart',
  templateUrl: './chart.component.html',
  styleUrls: ['./chart.component.sass']
})
export class ChartComponent  {

  @Input() language1: string = '';
  @Input() language2: string = '';
  @Input() language3: string = '';
  @Input() percentage1: string = '';
  @Input() percentage2: string = '';
  @Input() percentage3: string = '';
  
}