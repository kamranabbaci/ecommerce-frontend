import { Component } from '@angular/core';
import { ConfirmService } from '../../services/confirm';

@Component({
  selector: 'app-confirm-modal',
  standalone: true,
  templateUrl: './confirm-modal.html',
  styleUrl: './confirm-modal.css',
})
export class ConfirmModal {
  constructor(public confirmService: ConfirmService) {}
}
