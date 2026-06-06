import { Component } from '@angular/core';
import { MatCardModule } from '@angular/material/card';

@Component({
  selector: 'app-consultas',
  standalone: true,
  imports: [MatCardModule],
  template: `
    <div class="placeholder-page">
      <mat-card class="placeholder-card">
        <mat-card-header>
          <mat-card-title>Consultas de Contratos</mat-card-title>
          <mat-card-subtitle>Área privada</mat-card-subtitle>
        </mat-card-header>
        <mat-card-content>
          <p>Módulo de consultas — se desarrollará en la <strong>Iteración 7</strong>.</p>
        </mat-card-content>
      </mat-card>
    </div>
  `,
  styles: [`
    .placeholder-page {
      display: flex;
      justify-content: center;
      align-items: center;
      padding: 64px 24px;
    }
    .placeholder-card {
      max-width: 480px;
      width: 100%;
    }
  `],
})
export class ConsultasComponent {}
