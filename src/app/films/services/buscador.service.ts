import { BehaviorSubject } from 'rxjs';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class BuscadorService {

  terminoSubscriber: BehaviorSubject<string> = new BehaviorSubject(this.termino);

  constructor() { }

  set termino(value: string) {
    this.terminoSubscriber.next(value);
    sessionStorage.setItem('termino', value);
  }

  get termino() {
    return sessionStorage.getItem('termino') || "";
  }
}
