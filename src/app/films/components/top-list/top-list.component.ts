import { Component, Input, OnInit } from '@angular/core';

import { Film } from '../../interfaces/films.interfaces';


@Component({
  selector: 'app-top-list',
  templateUrl: './top-list.component.html',
  styles: [`
    .top-one {
      color: #C9B037;
    }
    .top-two {
      color: #D7D7D7;
    }
    .top-three {
      color: #AD8A56;
    }
    .invisible {
      color: transparent;
    }
    .top-position {
      transition: all ease 0.5s;
    }
    .top-position:hover {
      border-radius: 10px;
      background: rgba(0,0,0,0.2);
      transition: all ease 0.5s;
      cursor: pointer;
    }
  `
  ]
})
export class TopListComponent implements OnInit {

  @Input() film!: Film;
  @Input() index!: number;

  constructor() { }

  ngOnInit(): void {
  }

}
