import { Component, HostListener, OnInit } from '@angular/core';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['../styles/auth.styles.css']
})
export class HomeComponent implements OnInit {

  innerWidth: number;

  constructor() {
    this.innerWidth = window.innerHeight;
  }

  ngOnInit(): void {
  }

  @HostListener('window:resize', ['$event']) onResize(event: any) {
      this.innerWidth = window.innerWidth;
    }

}
