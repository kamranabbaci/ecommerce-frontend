import { Component, signal } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { Navbar } from './components/navbar/navbar';
import { Toast } from './shared/toast/toast';
import { ConfirmModal } from './shared/confirm-modal/confirm-modal';

@Component({
  selector: 'app-root',
  imports: [RouterOutlet, Navbar, Toast, ConfirmModal],
  templateUrl: './app.html',
  styleUrl: './app.css'
})
export class App {
  protected readonly title = signal('ecommerce-frontend');
}