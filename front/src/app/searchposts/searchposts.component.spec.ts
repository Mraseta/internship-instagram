import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SearchpostsComponent } from './searchposts.component';

describe('SearchpostsComponent', () => {
  let component: SearchpostsComponent;
  let fixture: ComponentFixture<SearchpostsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SearchpostsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SearchpostsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
