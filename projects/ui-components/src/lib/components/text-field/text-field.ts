import { CommonModule } from '@angular/common';
import { Component, Input } from '@angular/core';
import { FormControl, ReactiveFormsModule } from '@angular/forms';

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
  @Input() variant: 'text' | 'dropdown' | 'datepicker' = 'text';
  @Input() placeholder: string = '';
  @Input() control!: FormControl;
  @Input() options: any[] = [];
  @Input() isRequired: boolean = false;

  ngOnChanges() {
    // console.log('TextField input changed:', {
    //   label: this.label,
    //   type: this.type,
    //   placeholder: this.placeholder,
    //   control: this.control,
    //   options: this.options
    // });
  }
}
