import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BigStarsComponent } from './big-stars.component';

describe('BigStarsComponent', () => {
  let component: BigStarsComponent;
  let fixture: ComponentFixture<BigStarsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ BigStarsComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(BigStarsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
