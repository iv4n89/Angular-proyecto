import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'big-stars',
  templateUrl: './big-stars.component.html',
  styles: [
  ]
})
export class BigStarsComponent implements OnInit {

  @Input() initial_stars: number = 0;
  @Input() color: string = "#ebe778";
  @Input() size: number = 5;
  @Input() readOnly: boolean = true;

  constructor() { }

  ngOnInit(): void {
  }

}
