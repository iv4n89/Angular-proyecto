import { Directive, HostListener, ElementRef } from '@angular/core';

/**
 * This directive removes focus from the selectors after clicking on them
 */
@Directive({
  selector: '[openCloseSideNav]' // your selectors here!
})
export class BlurDirective {
  constructor(private elRef: ElementRef) {}

  @HostListener('mouseenter') mouseover() {
    if (screen.width > 400) {
      this.elRef.nativeElement.classList.add('open');
    }
  }

  @HostListener('mouseleave') mouseleave() {
    this.elRef.nativeElement.classList.remove('open');
  }
}
