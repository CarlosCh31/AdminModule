import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ProgramasEditDialogComponent } from './programas-edit-dialog.component';

describe('ProgramasEditDialogComponent', () => {
  let component: ProgramasEditDialogComponent;
  let fixture: ComponentFixture<ProgramasEditDialogComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ProgramasEditDialogComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ProgramasEditDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
