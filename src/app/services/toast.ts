import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class ToastService {
  message = '';

  type: 'success' | 'danger' | 'warning' | 'info' = 'success';

  visible = false;

  show(
    message: string,
    type: 'success' | 'danger' | 'warning' | 'info' = 'success',
    duration: number = 2500,
  ) {
    this.message = message;
    this.type = type;
    this.visible = true;

    setTimeout(() => {
      this.visible = false;
    }, duration);
  }
}
