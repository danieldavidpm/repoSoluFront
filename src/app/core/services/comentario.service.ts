import { Injectable, inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { ComentarioModel } from '../models/comentario.models';
import { ResponseModel } from '../models/contrato.models';
import { environment } from '../../../environments/environment';

@Injectable({ providedIn: 'root' })
export class ComentarioService {
  private http = inject(HttpClient);

  private readonly endpoint = `${environment.apiUrl}/Comentario/cliente`;

  getComentarios(codCli: number): Observable<ComentarioModel[]> {
    return this.http
      .get<ResponseModel<ComentarioModel[]>>(`${this.endpoint}/${codCli}`)
      .pipe(map(res => res.data));
  }
}
