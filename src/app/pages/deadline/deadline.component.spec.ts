import { ComponentFixture, TestBed, fakeAsync, flush, tick } from '@angular/core/testing';
import { DeadlineComponent } from './deadline.component';
import { DeadlineService } from '../../core/services/deadline.service';
import { of } from 'rxjs';

describe('DeadlineComponent', () => {
  let component: DeadlineComponent;
  let fixture: ComponentFixture<DeadlineComponent>;
  let deadlineServiceSpy: jest.Mocked<DeadlineService>;

  beforeEach(async () => {
    deadlineServiceSpy = jest.mocked<DeadlineService>({
      getDeadline: jest.fn().mockReturnValue(of({ secondsLeft: 100 }))
    } as DeadlineService);

    await TestBed.configureTestingModule({
      imports: [DeadlineComponent],
      providers: [
        { provide: DeadlineService, useValue: deadlineServiceSpy }
      ]
    }).compileComponents();

    fixture = TestBed.createComponent(DeadlineComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should fetch deadline data on init', () => {
    expect(deadlineServiceSpy.getDeadline).toHaveBeenCalled();
    expect(component.countdown).toBe(100);
  });

  it('should stop countdown at zero', fakeAsync(() => {
    component.countdown = 1;
    component['startClock']();
    fixture.detectChanges();

    tick(1000);
    expect(component.countdown).toBe(0);

    tick(1000);
    expect(component.countdown).toBe(0);
  }));
});
