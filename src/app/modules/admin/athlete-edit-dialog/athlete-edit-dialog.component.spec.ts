import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AthleteEditDialogComponent } from './athlete-edit-dialog.component';

describe('AthleteEditDialogComponent', () => {
  let component: AthleteEditDialogComponent;
  let fixture: ComponentFixture<AthleteEditDialogComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AthleteEditDialogComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AthleteEditDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
