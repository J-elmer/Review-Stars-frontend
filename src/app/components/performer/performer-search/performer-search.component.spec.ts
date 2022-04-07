import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PerformerSearchComponent } from './performer-search.component';

describe('PerformerSearchComponent', () => {
  let component: PerformerSearchComponent;
  let fixture: ComponentFixture<PerformerSearchComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PerformerSearchComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(PerformerSearchComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
