import { Component, inject } from "@angular/core";
import { DeadlineService } from "../../core/services/deadline.service";
import { DeadlineData } from "../../core/interface/deadline";
import { Subscription } from "rxjs";

@Component({
  selector: 'deadline',
  standalone: true,
  styleUrl: './deadline.component.scss',
  template: `<div class="wrapper">
  <p class="countdown">Seconds left to deadline: {{ countdown }}</p>
  <p class="sign">by Antônio or Toninho</p>
</div>`,
})
export class DeadlineComponent {
  countdown = 0;

  private deadlineService = inject(DeadlineService);
  private subscription: Subscription = new Subscription();
  private intervalId: any;

  ngOnInit() {
    this.fetchDeadlineData();
    this.startClock();
  }

  private fetchDeadlineData() {
    this.subscription = this.deadlineService.getDeadline().subscribe((data: DeadlineData) => {
      this.countdown = data.secondsLeft;
    });
  }

  private startClock() {
    this.intervalId = setInterval(() => {
      if (this.countdown > 0) {
        this.countdown--;
      } else {
        clearInterval(this.intervalId);
      }
    }, 1000);
  }

  ngOnDestroy() {
    this.subscription.unsubscribe();
    clearInterval(this.intervalId);
  }
}
