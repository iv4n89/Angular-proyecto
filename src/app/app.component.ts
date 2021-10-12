import { Component, HostListener, OnInit } from '@angular/core';
import { AuthService } from './auth/services/auth.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  title = 'Films DB';

  innerWidth: number;

  constructor(private authService: AuthService) {
    this.innerWidth = window.innerWidth;
  }

  ngOnInit(): void {
    this.authService.validarToken().subscribe();
    window.scrollTo(0, 0);
  }

  @HostListener('window:resize', ['$event']) onResize(event: any) {
    this.innerWidth = window.innerWidth;
  }
}
