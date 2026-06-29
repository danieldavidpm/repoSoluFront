import { Component, OnInit, inject, DestroyRef } from '@angular/core';
import { CommonModule, formatDate } from '@angular/common';
import { ReactiveFormsModule, FormControl } from '@angular/forms';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { filter } from 'rxjs/operators';
import { MatCardModule } from '@angular/material/card';
import { MatProgressBarModule } from '@angular/material/progress-bar';
import { MatIconModule } from '@angular/material/icon';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatNativeDateModule } from '@angular/material/core';
import { BaseChartDirective } from 'ng2-charts';
import type { ChartData, ChartOptions } from 'chart.js';
import { DashboardService } from '../../../../core/services/dashboard.service';
import { DashboardData } from '../../../../core/models/dashboard.models';

@Component({
  selector: 'app-dashboard',
  standalone: true,
  imports: [
    CommonModule,
    ReactiveFormsModule,
    MatCardModule,
    MatProgressBarModule,
    MatIconModule,
    MatFormFieldModule,
    MatInputModule,
    MatDatepickerModule,
    MatNativeDateModule,
    BaseChartDirective,
  ],
  templateUrl: './dashboard.component.html',
  styleUrl: './dashboard.component.scss',
})
export class DashboardComponent implements OnInit {
  private dashboardService = inject(DashboardService);
  private destroyRef = inject(DestroyRef);

  cargando = false;
  error = false;
  data: DashboardData | null = null;

  fechaControl = new FormControl<Date>(this.primerDiaMesActual());

  ventasChartData: ChartData<'bar'> = { labels: [], datasets: [] };
  habilitacionChartData: ChartData<'bar'> = { labels: [], datasets: [] };

  chartOptions: ChartOptions<'bar'> = {
    responsive: true,
    plugins: { legend: { display: false } },
    scales: {
      y: { beginAtZero: true, ticks: { stepSize: 1 } },
    },
  };

  ngOnInit(): void {
    this.cargarDatos();

    this.fechaControl.valueChanges
      .pipe(
        filter(v => !!v),
        takeUntilDestroyed(this.destroyRef),
      )
      .subscribe(() => this.cargarDatos());
  }

  private cargarDatos(): void {
    const fecha = this.fechaControl.value ?? this.primerDiaMesActual();
    const fechaStr = formatDate(fecha, 'yyyy-MM-dd', 'en-US');

    this.cargando = true;
    this.error = false;

    this.dashboardService
      .getIndicadores(fechaStr)
      .pipe(takeUntilDestroyed(this.destroyRef))
      .subscribe({
        next: data => {
          this.data = data;
          this.ventasChartData = this.toChartData(
            data.avanceVentasTrimestral,
            'Ventas',
            'rgba(0, 51, 102, 0.75)',
          );
          this.habilitacionChartData = this.toChartData(
            data.avanceHabilitacionTrimestral,
            'Habilitación',
            'rgba(74, 20, 140, 0.75)',
          );
          this.cargando = false;
        },
        error: () => {
          this.error = true;
          this.cargando = false;
        },
      });
  }

  private toChartData(
    items: { mes: string; total: number }[],
    label: string,
    color: string,
  ): ChartData<'bar'> {
    return {
      labels: items.map(i => i.mes),
      datasets: [
        {
          data: items.map(i => i.total),
          label,
          backgroundColor: color,
          borderColor: color.replace('0.75', '1'),
          borderWidth: 1,
          borderRadius: 4,
        },
      ],
    };
  }

  private primerDiaMesActual(): Date {
    const hoy = new Date();
    return new Date(hoy.getFullYear(), hoy.getMonth(), 1);
  }
}
