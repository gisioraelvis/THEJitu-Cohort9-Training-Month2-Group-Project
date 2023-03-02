import { Component, Input, Output, EventEmitter } from '@angular/core';

@Component({
  standalone: true,
  selector: 'app-http-error-popup',
  templateUrl: './http-error-popup.component.html',
  styleUrls: ['./http-error-popup.component.css'],
})
export class HttpErrorPopupComponent {
  @Input() code?: number;
  @Input() errorMessage?: string;
  @Output() close = new EventEmitter<void>();

  onClose(): void {
    this.close.emit();
  }
}
