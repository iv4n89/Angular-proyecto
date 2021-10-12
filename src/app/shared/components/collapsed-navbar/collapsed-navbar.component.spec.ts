import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CollapsedNavbarComponent } from './collapsed-navbar.component';

describe('CollapsedNavbarComponent', () => {
  let component: CollapsedNavbarComponent;
  let fixture: ComponentFixture<CollapsedNavbarComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CollapsedNavbarComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CollapsedNavbarComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
