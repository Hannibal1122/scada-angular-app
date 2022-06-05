import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MathGraphViewComponent } from './math-graph-view.component';

describe('MathGraphViewComponent', () => {
  let component: MathGraphViewComponent;
  let fixture: ComponentFixture<MathGraphViewComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ MathGraphViewComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(MathGraphViewComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
