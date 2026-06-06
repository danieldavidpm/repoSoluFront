import { Component } from '@angular/core';
import { MatCardModule } from '@angular/material/card';

@Component({
  selector: 'app-dashboard',
  standalone: true,
  imports: [MatCardModule],
  template: `
    <div class="placeholder-page">
      <mat-card class="placeholder-card">
        <mat-card-header>
          <mat-card-title>Dashboard</mat-card-title>
          <mat-card-subtitle>Área privada</mat-card-subtitle>
        </mat-card-header>
        <mat-card-content>
          <p>Panel de indicadores — se desarrollará en la <strong>Iteración 6</strong>.</p>
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
export class DashboardComponent {}
