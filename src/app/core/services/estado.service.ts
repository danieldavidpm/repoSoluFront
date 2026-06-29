import { Injectable, inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { EstadoModel } from '../models/estado.models';
import { ResponseModel } from '../models/contrato.models';
import { environment } from '../../../environments/environment';

@Injectable({ providedIn: 'root' })
export class EstadoService {
  private http = inject(HttpClient);

  getEstadosGenerales(): Observable<EstadoModel[]> {
    return this.http
      .get<ResponseModel<EstadoModel[]>>(`${environment.apiUrl}/EstadoGeneral/lista`)
      .pipe(map(res => res.data ?? []));
  }

  getEstadosProceso(codigoDeProceso: number): Observable<EstadoModel[]> {
    return this.http
      .get<ResponseModel<EstadoModel[]>>(`${environment.apiUrl}/EstadoProceso/lista`, {
        params: { codigoDeProceso },
      })
      .pipe(map(res => res.data ?? []));
  }
}
