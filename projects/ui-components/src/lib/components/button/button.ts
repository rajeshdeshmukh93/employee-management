import { CommonModule } from '@angular/common';
import { Component, Input } from '@angular/core';

@Component({
  selector: 'lib-button',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './button.html',
  styleUrls: ['./button.scss'],
})
export class Button {
  @Input() label: string = 'Button';
  @Input() size: 'xs' | 'sm' | 'md' | 'lg' = 'md';
  @Input() styleType: 'filled' | 'outline' = 'filled';

  @Input() variant: 'primary' | 'secondary' = 'primary';
  @Input() disabled: boolean = false;
  @Input() type: 'button' | 'submit' = 'button';

  get classes(): string[] {
    return [
      'btn',
      `btn-${this.variant}`,
      `btn-${this.size}`,
      `btn-${this.styleType}`
    ];
  }

}
