import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SkidComponent } from './skid.component';

describe('SkidComponent', () => {
  let component: SkidComponent;
  let fixture: ComponentFixture<SkidComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [SkidComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(SkidComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
