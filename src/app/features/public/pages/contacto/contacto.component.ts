import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';

@Component({
  selector: 'app-contacto',
  standalone: true,
  imports: [
    ReactiveFormsModule,
    MatButtonModule,
    MatFormFieldModule,
    MatIconModule,
    MatInputModule,
  ],
  templateUrl: './contacto.component.html',
  styleUrl: './contacto.component.scss',
})
export class ContactoComponent {
  form: FormGroup;
  submitted = false;

  readonly info = {
    address: 'Jr. Las Rosas 316 Urb. Primavera - Los Olivos',
    hours: 'Lunes a Sábado · 8:00 – 18:00 hs.',
    whatsapp: '986-105-706',
    email: 'jessica.felix@solumastic.com',
    mapsUrl: 'https://maps.google.com/?q=Jr.+Las+Rosas+316+Urb.+Primavera+Los+Olivos+Lima+Peru',
  };

  constructor(private fb: FormBuilder) {
    this.form = this.fb.group({
      nombre:   ['', [Validators.required, Validators.minLength(3)]],
      email:    ['', [Validators.required, Validators.email]],
      telefono: [''],
      mensaje:  ['', [Validators.required, Validators.minLength(10)]],
    });
  }

  hasError(field: string, error: string): boolean {
    const ctrl = this.form.get(field);
    return !!(ctrl?.hasError(error) && ctrl.touched);
  }

  onSubmit(): void {
    if (this.form.valid) {
      this.submitted = true;
      this.form.reset();
    } else {
      this.form.markAllAsTouched();
    }
  }

  sendAnother(): void {
    this.submitted = false;
  }
}
