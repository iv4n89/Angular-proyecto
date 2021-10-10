import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-home-page',
  templateUrl: './home-page.component.html',
  styles: [`
    @media screen and (max-width: 400px) {
      div .row {
        padding-top: 50px;
        padding-left: 100px;
      }
    }
  `
  ]
})
export class HomePageComponent implements OnInit {

  constructor() { }

  ngOnInit(): void {
  }

}
