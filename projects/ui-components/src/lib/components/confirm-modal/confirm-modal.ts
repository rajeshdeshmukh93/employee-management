import { Component, EventEmitter, Input, Output } from '@angular/core';
import { Button } from '../button/button';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'lib-confirm-modal',
  standalone:true,
  imports: [Button, CommonModule],
  templateUrl: './confirm-modal.html',
  styleUrl: './confirm-modal.scss',
})
export class ConfirmModal {
  @Input() isOpen = false;
  @Input() title = '';
  @Input() message = '';
  @Output() confirm = new EventEmitter<void>();
  @Output() cancel = new EventEmitter<void>();

  onConfirm() { this.confirm.emit(); }
  onCancel() { this.cancel.emit(); }
}
