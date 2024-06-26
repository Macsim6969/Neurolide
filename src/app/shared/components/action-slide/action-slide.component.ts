import { Component, EventEmitter, Input, Output } from '@angular/core';

@Component({
  selector: 'app-action-slide',
  templateUrl: './action-slide.component.html',
  styleUrls: ['./action-slide.component.scss']
})
export class ActionSlideComponent {
  @Input() slider;
  @Input() activeCard: number;
  @Output() activeId: EventEmitter<number> = new EventEmitter<number>();
  public isLeft: boolean;
  public isRight: boolean;

  public left() {
    if (this.activeCard === 0) {
      this.isLeft = true;
      this.isRight = false; 
      return
    } else {
      this.isRight = false;
      this.isLeft = false;
      this.activeCard--;
      this.activeId.emit(this.activeCard);
    }
  }

  public right() {
    if (this.activeCard === this.slider.length - 1) {
      this.isRight = true;
      this.isLeft = false;
      return
    } else {
      this.isLeft = false;
      this.isRight = false;
      this.activeCard++
      this.activeId.emit(this.activeCard);
    }
  }
}
