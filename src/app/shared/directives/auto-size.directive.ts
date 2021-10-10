import { Directive, ElementRef, HostListener, OnInit } from '@angular/core';

@Directive({
  selector: '[autosize]'
})
export class AutoSizeDirective implements OnInit {

  constructor(private el: ElementRef<HTMLTextAreaElement> ) { }

  ngOnInit() {
    setTimeout(() => {
      this.el.nativeElement.style.cssText = 'heigh: auto; padding: 0';
      this.el.nativeElement.style.cssText = `height: ${this.el.nativeElement.scrollHeight + 50}px`;
    }, 0);
  }

  @HostListener('keydown', ['$event']) onkeydown(e: any) {

      this.el.nativeElement.style.cssText = 'heigh: auto; padding: 0';
      this.el.nativeElement.style.cssText = `height: ${this.el.nativeElement.scrollHeight + 50}px`;

  }
}
