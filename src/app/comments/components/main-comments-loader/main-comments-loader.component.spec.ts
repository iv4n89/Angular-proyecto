import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MainCommentsLoaderComponent } from './main-comments-loader.component';

describe('MainCommentsLoaderComponent', () => {
  let component: MainCommentsLoaderComponent;
  let fixture: ComponentFixture<MainCommentsLoaderComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ MainCommentsLoaderComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(MainCommentsLoaderComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
