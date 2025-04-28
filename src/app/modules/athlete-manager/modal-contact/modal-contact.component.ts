import { Component, Inject } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { FormsModule } from '@angular/forms';
import { NgIf } from '@angular/common';
import {MatButton} from '@angular/material/button';

@Component({
  selector: 'app-modal-contact',
  templateUrl: './modal-contact.component.html',
  styleUrls: ['./modal-contact.component.scss'],
  standalone: true,
  imports: [FormsModule, NgIf, MatButton],
})
export class ModalContactComponent {
  subject: string = '';
  body: string = '';
  sending = false;
  responseMessage = '';

  constructor(
    @Inject(MAT_DIALOG_DATA) public data: { athlete: any },
    private dialogRef: MatDialogRef<ModalContactComponent>,
    private http: HttpClient
  ) {}

  close() {
    this.dialogRef.close();
  }

  sendEmail() {
    if (!this.data.athlete.email) {
      this.responseMessage = 'Este atleta no tiene correo registrado.';
      return;
    }

    const payload = {
      to: this.data.athlete.email,
      subject: this.subject,
      body: this.body,
    };

    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
      'Authorization': 'Bearer supersecreto123',
    });

    this.sending = true;
    this.responseMessage = 'Enviando...';

    this.http.post('http://157.173.210.17:8000/send-email', payload, { headers }).subscribe({
      next: () => {
        this.sending = false;
        this.responseMessage = '✅ Correo enviado correctamente.';
      },
      error: (err) => {
        this.sending = false;
        console.error('Error enviando correo:', err);
        this.responseMessage = '❌ Error enviando correo.';
      }
    });
  }
}
