import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ActivityEditDialogComponent } from './activity-edit-dialog.component';

describe('ActivityEditDialogComponent', () => {
  let component: ActivityEditDialogComponent;
  let fixture: ComponentFixture<ActivityEditDialogComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ActivityEditDialogComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ActivityEditDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
