import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MathGraphComponent } from './math-graph.component';

describe('MathGraphComponent', () => {
  let component: MathGraphComponent;
  let fixture: ComponentFixture<MathGraphComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ MathGraphComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(MathGraphComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
