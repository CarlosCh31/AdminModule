import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AthleteFormComponent } from './athlete-form.component';

describe('AthleteFormComponent', () => {
  let component: AthleteFormComponent;
  let fixture: ComponentFixture<AthleteFormComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AthleteFormComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AthleteFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
