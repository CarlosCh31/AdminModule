import { ComponentFixture, TestBed } from '@angular/core/testing';

import { IndexCoordinatorComponent } from './index-coordinator.component';

describe('IndexCoordinatorComponent', () => {
  let component: IndexCoordinatorComponent;
  let fixture: ComponentFixture<IndexCoordinatorComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [IndexCoordinatorComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(IndexCoordinatorComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
