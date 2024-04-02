import { animate, state, style, transition, trigger } from '@angular/animations';
import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-overlay',
  template: `
    <div class="overlay" *ngIf="show" [@fadeInOut]>
      <div class="overlay-content" [innerHTML]="content"></div>
    </div>
  `,
  styles: [`
  .overlay {
    position: fixed;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background-color: #008037;
    display: flex;
    justify-content: center;
    align-items: center;
    z-index: 9999;
  }

  .overlay-content {
    color: #fff;
    text-align: center;
    padding: 20px;
    width: 100%;
  }
`],
animations: [
  trigger('fadeInOut', [
    state('void', style({ opacity: 0 })),
    transition(':enter', [
      style({ opacity: 0 }),
      animate('100ms ease-in-out', style({ opacity: 1 }))
    ]),
    transition(':leave', [
      style({ opacity: 1 }),
      animate('300ms ease-in-out', style({ opacity: 0 }))
    ])
  ])
]
})
export class OverlayComponent {
  @Input() content: string;
  @Input() duration: number;
  show = false;
  private timeout: any;

  ngOnInit() {
    this.startTimer();
  }

  ngOnDestroy() {
    this.clearTimer();
  }

  open() {
    this.show = true;
    this.startTimer();
  }

  close() {
    this.show = false;
    this.clearTimer();
  }

  private startTimer() {
    if (this.duration > 0) {
      this.timeout = setTimeout(() => {
        this.close();
      }, this.duration);
    }
  }

  private clearTimer() {
    if (this.timeout) {
      clearTimeout(this.timeout);
      this.timeout = null;
    }
  }
}