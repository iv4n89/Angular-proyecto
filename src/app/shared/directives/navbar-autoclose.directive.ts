import { Directive, ElementRef, HostListener } from '@angular/core';

@Directive({
  selector: '[navbarAutoclose]'
})
export class NavbarAutocloseDirective {

  constructor(private elRef: ElementRef<HTMLElement>) { }

  @HostListener('document:click', ['$event']) clickOutside(event: any) {
    const buscador = document.querySelector('input[type="search"]');
    if (event.target !== buscador && !this.elRef.nativeElement.classList.contains('collapsed')) {
      this.elRef.nativeElement.click();
    }
  }

}
