import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class ConfirmService {
  visible = false;

  title = 'Are you sure?';
  message = 'This action cannot be undone.';
  confirmText = 'Yes, Delete';
  cancelText = 'Cancel';

  private resolveFn?: (value: boolean) => void;

  confirm(
    title: string,
    message: string,
    confirmText: string = 'Confirm',
    cancelText: string = 'Cancel',
  ): Promise<boolean> {
    this.title = title;
    this.message = message;
    this.confirmText = confirmText;
    this.cancelText = cancelText;
    this.visible = true;

    return new Promise<boolean>((resolve) => {
      this.resolveFn = resolve;
    });
  }

  accept(): void {
    this.visible = false;
    this.resolveFn?.(true);
  }

  cancel(): void {
    this.visible = false;
    this.resolveFn?.(false);
  }
}
