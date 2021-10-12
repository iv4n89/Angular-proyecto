import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SelectorDeGeneroComponent } from './selector-de-genero.component';

describe('SelectorDeGeneroComponent', () => {
  let component: SelectorDeGeneroComponent;
  let fixture: ComponentFixture<SelectorDeGeneroComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SelectorDeGeneroComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(SelectorDeGeneroComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
