import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ExamchartComponent } from './examchart.component';

describe('ExamchartComponent', () => {
  let component: ExamchartComponent;
  let fixture: ComponentFixture<ExamchartComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ExamchartComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(ExamchartComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
