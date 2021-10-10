import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TopListPageComponent } from './top-list-page.component';

describe('TopListPageComponent', () => {
  let component: TopListPageComponent;
  let fixture: ComponentFixture<TopListPageComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ TopListPageComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(TopListPageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
