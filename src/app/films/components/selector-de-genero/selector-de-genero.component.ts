import { Component, EventEmitter, HostListener, OnInit, Output } from '@angular/core';

@Component({
  selector: 'app-selector-de-genero',
  templateUrl: './selector-de-genero.component.html',
  styles: [
  ]
})
export class SelectorDeGeneroComponent implements OnInit {

  @Output() onSelect: EventEmitter<string> = new EventEmitter();

  constructor() { }

  ngOnInit(): void {

  }

  @HostListener('change', ['$event.target.value']) onchange(value: string) {
    this.onSelect.emit(value);
  }

}
