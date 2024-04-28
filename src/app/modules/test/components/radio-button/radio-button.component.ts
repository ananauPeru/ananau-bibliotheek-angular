import { Component, Input, forwardRef } from '@angular/core';
import { ControlValueAccessor, NG_VALUE_ACCESSOR } from '@angular/forms';

@Component({
  selector: 'app-radio-button',
  templateUrl: './radio-button.component.html',
  styleUrls: ['./radio-button.component.scss'],
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => RadioButtonComponent),
      multi: true
    }
  ]
})
export class RadioButtonComponent implements ControlValueAccessor {
  @Input() answers: any[];
  @Input() questionId: number;
  @Input() showResults = false;
  @Input() selectedAnswerId: number;

  onChange: any = () => {};
  onTouched: any = () => {};

  writeValue(value: number): void {
    this.selectedAnswerId = value;
  }

  registerOnChange(fn: any): void {
    this.onChange = fn;
  }

  registerOnTouched(fn: any): void {
    this.onTouched = fn;
  }

  selectAnswer(answerId: number) {
    this.selectedAnswerId = answerId;
    this.onChange(answerId);
  }
}