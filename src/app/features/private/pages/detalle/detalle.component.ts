import { Component, OnInit, inject, input, DestroyRef } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterLink } from '@angular/router';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { MatCardModule } from '@angular/material/card';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatProgressBarModule } from '@angular/material/progress-bar';
import { MatChipsModule } from '@angular/material/chips';
import { MatDividerModule } from '@angular/material/divider';
import { MatTooltipModule } from '@angular/material/tooltip';
import { ContratoDetalleModel, AdjuntoModel } from '../../../../core/models/contrato.models';
import { ComentarioModel } from '../../../../core/models/comentario.models';
import { ContratoService } from '../../../../core/services/contrato.service';
import { ComentarioService } from '../../../../core/services/comentario.service';
import { AuthService } from '../../../../core/services/auth.service';
import { environment } from '../../../../../environments/environment';

@Component({
  selector: 'app-detalle',
  standalone: true,
  imports: [
    CommonModule,
    RouterLink,
    MatCardModule,
    MatButtonModule,
    MatIconModule,
    MatProgressBarModule,
    MatChipsModule,
    MatDividerModule,
    MatTooltipModule,
  ],
  templateUrl: './detalle.component.html',
  styleUrl: './detalle.component.scss',
})
export class DetalleComponent implements OnInit {
  readonly id = input.required<string>();

  private contratoService   = inject(ContratoService);
  private comentarioService = inject(ComentarioService);
  private authService       = inject(AuthService);
  private destroyRef        = inject(DestroyRef);

  private readonly blobBase =
    `${environment.blobStorage.url}/${this.authService.getContainer()}`;

  cargando = false;
  error    = false;
  detalle: ContratoDetalleModel | null = null;

  cargandoAdjuntos = false;
  errorAdjuntos    = false;
  adjuntos: AdjuntoModel[] = [];

  cargandoComentarios = false;
  errorComentarios    = false;
  comentarios: ComentarioModel[] = [];

  imagenPrevia: string | null = null;

  ngOnInit(): void {
    const id = +this.id();
    this.cargarDetalle(id);
    this.cargarAdjuntos(id);
    this.cargarComentarios(id);
  }

  private cargarDetalle(id: number): void {
    this.cargando = true;
    this.contratoService.getContratoDetalle(id)
      .pipe(takeUntilDestroyed(this.destroyRef))
      .subscribe({
        next: data => {
          console.log('[Detalle] id recibido:', this.id(), '| codigoCliente API:', data.codigoCliente);
          this.detalle  = data;
          this.cargando = false;
        },
        error: () => { this.error = true; this.cargando = false; },
      });
  }

  private cargarAdjuntos(id: number): void {
    this.cargandoAdjuntos = true;
    this.contratoService.getImagenes(id)
      .pipe(takeUntilDestroyed(this.destroyRef))
      .subscribe({
        next: data => { this.adjuntos = data; this.cargandoAdjuntos = false; },
        error: () => { this.errorAdjuntos = true; this.cargandoAdjuntos = false; },
      });
  }

  private cargarComentarios(id: number): void {
    this.cargandoComentarios = true;
    this.comentarioService.getComentarios(id)
      .pipe(takeUntilDestroyed(this.destroyRef))
      .subscribe({
        next: data => { this.comentarios = data; this.cargandoComentarios = false; },
        error: () => { this.errorComentarios = true; this.cargandoComentarios = false; },
      });
  }

  getAdjuntoUrl(adj: AdjuntoModel): string {
    return `${this.blobBase}/${adj.automaticFileName}`;
  }

  previsualizarAdjunto(adj: AdjuntoModel): void {
    if (this.esImagen(adj.manualFileName)) {
      this.imagenPrevia = this.getAdjuntoUrl(adj);
    } else {
      window.open(this.getAdjuntoUrl(adj), '_blank');
    }
  }

  async descargarAdjunto(adj: AdjuntoModel): Promise<void> {
    const url = this.getAdjuntoUrl(adj);
    try {
      const res  = await fetch(url);
      const blob = await res.blob();
      const objectUrl = URL.createObjectURL(blob);
      const a = document.createElement('a');
      a.href     = objectUrl;
      a.download = adj.manualFileName;
      document.body.appendChild(a);
      a.click();
      document.body.removeChild(a);
      URL.revokeObjectURL(objectUrl);
    } catch {
      window.open(url, '_blank');
    }
  }

  cerrarPrevia(): void {
    this.imagenPrevia = null;
  }

  colorEstadoGeneral(valor: string | null): string {
    const map: Record<string, string> = {
      'PEND. EN VTAS':     '#1e88e5',
      'PEND. EN INTERNAS': '#fb8c00',
      'HABILITADA':        '#43a047',
    };
    return map[valor ?? ''] ?? '#9e9e9e';
  }

  iconoArchivo(nombre: string): string {
    const ext = nombre.split('.').pop()?.toLowerCase() ?? '';
    if (ext === 'pdf') return 'picture_as_pdf';
    if (this.esImagen(nombre)) return 'image';
    return 'attach_file';
  }

  private esImagen(nombre: string): boolean {
    const ext = nombre.split('.').pop()?.toLowerCase() ?? '';
    return ['png', 'jpg', 'jpeg', 'gif', 'webp'].includes(ext);
  }
}
