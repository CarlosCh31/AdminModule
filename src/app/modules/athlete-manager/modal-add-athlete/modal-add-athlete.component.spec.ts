import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ModalAddAthleteComponent } from './modal-add-athlete.component';

describe('ModalAddAthleteComponent', () => {
  let component: ModalAddAthleteComponent;
  let fixture: ComponentFixture<ModalAddAthleteComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ModalAddAthleteComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ModalAddAthleteComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
