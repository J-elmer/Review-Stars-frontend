import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ConcertFormComponentComponent } from './concert-form-component.component';

describe('ConcertFormComponentComponent', () => {
  let component: ConcertFormComponentComponent;
  let fixture: ComponentFixture<ConcertFormComponentComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ConcertFormComponentComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ConcertFormComponentComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
