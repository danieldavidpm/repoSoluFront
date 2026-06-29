import { Injectable, inject } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { AdjuntoModel, ContratoDetalleModel, ContratoVentaFilter, ContratoVentaModel, ResponseModel } from '../models/contrato.models';
import { environment } from '../../../environments/environment';

@Injectable({ providedIn: 'root' })
export class ContratoService {
  private http = inject(HttpClient);

  private readonly endpoint = `${environment.apiUrl}/contratoventa/contratos/prg`;

  getContratos(filter: ContratoVentaFilter): Observable<ContratoVentaModel[]> {
    return this.http
      .get<ResponseModel<ContratoVentaModel[]>>(this.endpoint, { params: this.toParams(filter) })
      .pipe(map(res => res.data));
  }

  getContratoDetalle(id: number): Observable<ContratoDetalleModel> {
    return this.http
      .get<ResponseModel<ContratoDetalleModel>>(`${environment.apiUrl}/ContratoVenta/contratos/${id}`)
      .pipe(map(res => res.data));
  }

  getImagenes(id: number): Observable<AdjuntoModel[]> {
    return this.http
      .get<ResponseModel<AdjuntoModel[]>>(`${environment.apiUrl}/ContratoVenta/contratos/${id}/imagenes`)
      .pipe(map(res => res.data));
  }

  private toParams(filter: ContratoVentaFilter): HttpParams {
    return Object.entries(filter).reduce((params, [key, value]) => {
      if (value !== undefined && value !== null && value !== '') {
        return params.set(key, String(value));
      }
      return params;
    }, new HttpParams());
  }
}
