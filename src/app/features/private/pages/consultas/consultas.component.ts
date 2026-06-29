import { Component, OnInit, inject } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { RouterLink } from '@angular/router';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatSelectModule } from '@angular/material/select';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatIconModule } from '@angular/material/icon';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { ContratoVentaModel } from '../../../../core/models/contrato.models';
import { ProyectoModel } from '../../../../core/models/proyecto.models';
import { PersonalModel } from '../../../../core/models/personal.models';
import { EstadoModel } from '../../../../core/models/estado.models';
import { ContratoService } from '../../../../core/services/contrato.service';
import { ProyectoService } from '../../../../core/services/proyecto.service';
import { PersonalService } from '../../../../core/services/personal.service';
import { EstadoService } from '../../../../core/services/estado.service';
import { ConsultaStateService } from '../../../../core/services/consulta-state.service';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-consultas',
  standalone: true,
  imports: [
    ReactiveFormsModule,
    RouterLink,
    MatButtonModule,
    MatCardModule,
    MatSelectModule,
    MatFormFieldModule,
    MatInputModule,
    MatIconModule,
    MatProgressSpinnerModule,
  ],
  templateUrl: './consultas.component.html',
  styleUrl: './consultas.component.scss',
})
export class ConsultasComponent implements OnInit {
  private fb               = inject(FormBuilder);
  private contratoService  = inject(ContratoService);
  private proyectoService  = inject(ProyectoService);
  private personalService  = inject(PersonalService);
  private estadoService    = inject(EstadoService);
  private consultaState    = inject(ConsultaStateService);

  filterForm: FormGroup = this.fb.group({
    proyecto:          [null],
    proceso:           [null],
    procesoSecundario: [null],
    responsable:       [null],
    fechaTipo:         [null],
    fechaDesde:        [''],
    fechaHasta:        [''],
    datoTipo:          [null],
    datoValor:         [''],
  });

  contratos:          ContratoVentaModel[] = [];
  proyectos:          ProyectoModel[]      = [];
  personal:           PersonalModel[]      = [];
  estadosSecundarios: EstadoModel[]        = [];
  cargando          = false;
  cargandoProyectos = false;
  cargandoPersonal  = false;
  cargandoEstados   = false;
  errorMsg          = '';

  readonly procesos   = ['Estado General', 'Ventas', 'Internas'];
  readonly fechaTipos   = ['Envío a Cálidda', 'Firma de Contrato', 'Estado de Contrato'];
  readonly datoTipos    = ['Nombres', 'Apellidos', 'Dirección', 'Puerta', 'Distrito', 'CUP', 'CTACON', 'NROINS'];

  constructor() {
    this.filterForm.get('procesoSecundario')!.disable({ emitEvent: false });

    this.filterForm.get('proceso')!.valueChanges
      .pipe(takeUntilDestroyed())
      .subscribe(proceso => {
        this.filterForm.get('procesoSecundario')!.setValue(null, { emitEvent: false });
        this.filterForm.get('procesoSecundario')!.disable({ emitEvent: false });
        this.estadosSecundarios = [];
        if (proceso) this.cargarEstadosSecundarios(proceso);
      });
  }

  ngOnInit(): void {
    this.cargarProyectos();
    this.cargarPersonal();

    const estado = this.consultaState.restaurar();
    if (estado) {
      this.estadosSecundarios = estado.estadosSecundarios;
      if (estado.estadosSecundarios.length > 0) {
        this.filterForm.get('procesoSecundario')!.enable({ emitEvent: false });
      }
      this.filterForm.patchValue(estado.filtros, { emitEvent: false });
      this.contratos = estado.contratos;
    }
  }

  private cargarProyectos(): void {
    this.cargandoProyectos = true;
    this.proyectoService.getProyectos().subscribe({
      next:  data => { this.proyectos = data; this.cargandoProyectos = false; },
      error: ()   => { this.cargandoProyectos = false; },
    });
  }

  private cargarPersonal(): void {
    this.cargandoPersonal = true;
    this.personalService.getPersonal().subscribe({
      next:  data => { this.personal = data; this.cargandoPersonal = false; },
      error: ()   => { this.cargandoPersonal = false; },
    });
  }

  private cargarEstadosSecundarios(proceso: string): void {
    this.cargandoEstados = true;
    const request$: Observable<EstadoModel[]> = proceso === 'Estado General'
      ? this.estadoService.getEstadosGenerales()
      : proceso === 'Ventas'
        ? this.estadoService.getEstadosProceso(1)
        : this.estadoService.getEstadosProceso(4);

    request$.subscribe({
      next: data => {
        this.estadosSecundarios = data;
        this.cargandoEstados = false;
        this.filterForm.get('procesoSecundario')!.enable({ emitEvent: false });
      },
      error: () => { this.cargandoEstados = false; },
    });
  }

  ejecutarConsulta(): void {
    this.cargando = true;
    this.errorMsg = '';
    const f = this.filterForm.getRawValue();
    console.log('[Consulta] filtros enviados:', f);
    this.contratoService.getContratos({
      Tipo_de_Proyecto:      f.proyecto          ?? undefined,
      Tipo_de_Proceso:       f.proceso           ?? undefined,
      Estado_de_Proceso:     f.procesoSecundario ?? undefined,
      Codigo_de_Responsable: f.responsable       ?? undefined,
      Tipo_de_Fecha:         f.fechaTipo         ?? undefined,
      Fecha_desde:           f.fechaDesde        || undefined,
      Fecha_hasta:           f.fechaHasta        || undefined,
      Tipo_de_dato:          f.datoTipo          ?? undefined,
      Valor_dato:            f.datoValor         || undefined,
    }).subscribe({
      next:  (data) => {
        console.log('[Consulta] primer resultado:', data[0]);
        this.contratos = data;
        this.cargando = false;
        this.consultaState.guardar(
          this.filterForm.getRawValue(),
          data,
          this.estadosSecundarios,
        );
      },
      error: (err)  => {
        this.cargando = false;
        this.errorMsg = err?.error?.message ?? 'Error al consultar contratos. Intente nuevamente.';
      },
    });
  }

  limpiarFiltros(): void {
    this.filterForm.reset({
      proyecto: null, proceso: null, procesoSecundario: null,
      responsable: null, fechaTipo: null, fechaDesde: '', fechaHasta: '',
      datoTipo: null, datoValor: '',
    });
    this.contratos = [];
    this.errorMsg  = '';
    this.consultaState.limpiar();
  }

  colorEstadoGeneral(valor: string | null): string {
    const map: Record<string, string> = {
      'PEND. EN VTAS':     '#1e88e5',
      'PEND. EN INTERNAS': '#fb8c00',
      'HABILITADA':        '#43a047',
    };
    return map[valor ?? ''] ?? '#9e9e9e';
  }
}
