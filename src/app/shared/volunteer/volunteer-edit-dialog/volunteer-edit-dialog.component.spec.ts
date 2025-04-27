import { ComponentFixture, TestBed } from '@angular/core/testing';

import { VolunteerEditDialogComponent } from './volunteer-edit-dialog.component';

describe('VolunteerEditDialogComponent', () => {
  let component: VolunteerEditDialogComponent;
  let fixture: ComponentFixture<VolunteerEditDialogComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [VolunteerEditDialogComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(VolunteerEditDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
