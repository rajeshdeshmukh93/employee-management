import { CommonModule } from '@angular/common';
import { Component, Input } from '@angular/core';
import { FormControl, ReactiveFormsModule } from '@angular/forms';
import { NgControl } from '@angular/forms';
import { Optional, Self } from '@angular/core';
import { NG_VALUE_ACCESSOR } from '@angular/forms';
import { forwardRef } from '@angular/core';

@Component({
  selector: 'lib-text-field',
  standalone: true,
  imports: [ReactiveFormsModule, CommonModule],
  templateUrl: './text-field.html',
  styleUrls: ['./text-field.scss'],
})
export class TextField {

  @Input() label!: string;
  @Input() type: string = 'text';
  // @Input() variant: 'text' | 'dropdown' | 'datepicker' = 'text';
  // @Input() placeholder: string = '';
  // @Input() control!: FormControl;
  @Input() options: any[] = [];
  @Input() isRequired: boolean = false;

  value: any = '';
  isDisabled = false;

  constructor(@Optional() @Self() public ngControl: NgControl) {
  if (this.ngControl != null) {
    this.ngControl.valueAccessor = this;
  }
}
  ngOnChanges() {}

  // functions provided by Angular
  onChange: any = () => {};
  onTouched: any = () => {};

  // called when form sets value
  writeValue(value: any): void {
    this.value = value;
  }

  // register change
  registerOnChange(fn: any): void {
    this.onChange = fn;
  }

  // register touched
  registerOnTouched(fn: any): void {
    this.onTouched = fn;
  }

  // disabled state
  setDisabledState(isDisabled: boolean): void {
    this.isDisabled = isDisabled;
  }

  // when user types
  onInput(event: any) {
    const val = event.target.value;
    this.value = val;
    this.onChange(val);
  }

  onBlur() {
    this.onTouched();
  }
}
