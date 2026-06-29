import { Injectable } from '@angular/core';
import { ContratoVentaModel } from '../models/contrato.models';
import { EstadoModel } from '../models/estado.models';

interface ConsultaState {
  filtros:            Record<string, unknown>;
  contratos:          ContratoVentaModel[];
  estadosSecundarios: EstadoModel[];
}

@Injectable({ providedIn: 'root' })
export class ConsultaStateService {
  private state: ConsultaState | null = null;

  guardar(filtros: Record<string, unknown>, contratos: ContratoVentaModel[], estadosSecundarios: EstadoModel[]): void {
    this.state = { filtros, contratos, estadosSecundarios };
  }

  restaurar(): ConsultaState | null {
    return this.state;
  }

  limpiar(): void {
    this.state = null;
  }
}
