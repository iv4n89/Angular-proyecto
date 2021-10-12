import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-home-page',
  templateUrl: './home-page.component.html',
  styles: [`
    @media screen and (max-width: 400px) {
      div .row {
        padding-top: 50px;
      }
    }
  `
  ]
})
export class HomePageComponent implements OnInit {

  constructor(private router: Router) { }

  ngOnInit(): void {
  }

  get isList() {
    return this.router.url === '/films/list';
  }
  get isTop() {
    return this.router.url === `/films/top`;
  }

}
