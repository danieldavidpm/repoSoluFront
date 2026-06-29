import { Injectable, inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { ProyectoModel } from '../models/proyecto.models';
import { environment } from '../../../environments/environment';

@Injectable({ providedIn: 'root' })
export class ProyectoService {
  private http = inject(HttpClient);

  private readonly endpoint = `${environment.apiUrl}/Proyecto/lista`;

  getProyectos(codCliSolu = 20): Observable<ProyectoModel[]> {
    return this.http
      .get<any>(this.endpoint, { params: { codCliSolu } })
      .pipe(
        // Acepta respuesta directa (array) o envuelta en ResponseModel { data: [...] }
        map(res => (Array.isArray(res) ? res : (res.data ?? res.Data ?? [])))
      );
  }
}
