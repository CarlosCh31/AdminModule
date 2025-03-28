import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ResultsRegisterComponent } from './results-register.component';

describe('ResultsRegisterComponent', () => {
  let component: ResultsRegisterComponent;
  let fixture: ComponentFixture<ResultsRegisterComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ResultsRegisterComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ResultsRegisterComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
