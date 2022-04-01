import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PerformerFormComponent } from './performer-form.component';

describe('NewUpdatePerformerComponent', () => {
  let component: PerformerFormComponent;
  let fixture: ComponentFixture<PerformerFormComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PerformerFormComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(PerformerFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
