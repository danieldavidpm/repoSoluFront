import { Injectable, inject } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { DashboardData } from '../models/dashboard.models';
import { ResponseModel } from '../models/contrato.models';
import { environment } from '../../../environments/environment';

@Injectable({ providedIn: 'root' })
export class DashboardService {
  private http = inject(HttpClient);

  private readonly endpoint = `${environment.apiUrl}/Dashboard`;

  getIndicadores(fechaActual: string): Observable<DashboardData> {
    const params = new HttpParams().set('fechaActual', fechaActual);
    return this.http
      .get<ResponseModel<DashboardData>>(this.endpoint, { params })
      .pipe(map(res => res.data));
  }
}
