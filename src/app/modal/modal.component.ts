import { Component, Input, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'app-modal',
  templateUrl: './modal.component.html',
  styleUrls: ['./modal.component.css']
})
export class ModalComponent {
  @Input() isVisible: boolean = false; // Controla si el modal es visible o no
  @Output() close = new EventEmitter<void>(); // Emite un evento cuando se cierra el modal

  closeModal() {
    this.close.emit(); // Emitimos el evento para cerrar el modal
  }
}
