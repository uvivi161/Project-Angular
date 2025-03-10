import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CourseManegmentComponent } from './course-manegment.component';

describe('CourseManegmentComponent', () => {
  let component: CourseManegmentComponent;
  let fixture: ComponentFixture<CourseManegmentComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CourseManegmentComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CourseManegmentComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
