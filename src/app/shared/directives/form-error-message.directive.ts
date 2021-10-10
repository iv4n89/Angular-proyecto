import { Directive, ElementRef, Input, OnInit } from '@angular/core';

@Directive({
  selector: '[errorMessage]'
})
export class FormErrorMessageDirective implements OnInit{

  private _color: string = 'red';
  private _message: string = '';
  htmlElement: ElementRef<HTMLElement>;

  @Input() set color(valor: string) {
    this.htmlElement.nativeElement.style.color = valor;
    this._color = valor;
  }

  @Input() set message(valor: string) {
    this.htmlElement.nativeElement.innerHTML = valor;
    this._message = valor;
  }

  @Input() set valid(valor: boolean) {
    valor ? this.htmlElement.nativeElement.classList.add('hidden') : this.htmlElement.nativeElement.classList.remove('hidden');
  }

  constructor(private el: ElementRef<HTMLElement>) {
    this.htmlElement = el;
    this.color = 'red';
    this.message = 'El campo es requerido';
  }

  ngOnInit(): void {
    this.setBootstrapClass();
  }

  setBootstrapClass() {
    this.el.nativeElement.classList.add('form-text');
  }

}
