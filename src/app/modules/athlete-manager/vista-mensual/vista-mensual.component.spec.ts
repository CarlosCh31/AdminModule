import { ComponentFixture, TestBed } from '@angular/core/testing';

import { VistaMensualComponent } from './vista-mensual.component';

describe('VistaMensualComponent', () => {
  let component: VistaMensualComponent;
  let fixture: ComponentFixture<VistaMensualComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [VistaMensualComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(VistaMensualComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
