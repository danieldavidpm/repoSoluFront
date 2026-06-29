import { Injectable, inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { PersonalModel } from '../models/personal.models';
import { environment } from '../../../environments/environment';

@Injectable({ providedIn: 'root' })
export class PersonalService {
  private http = inject(HttpClient);

  private readonly endpoint = `${environment.apiUrl}/Personal/lista`;

  getPersonal(codCliSolu = 20): Observable<PersonalModel[]> {
    return this.http
      .get<any>(this.endpoint, { params: { codCliSolu } })
      .pipe(
        map(res => (Array.isArray(res) ? res : (res.data ?? res.Data ?? [])))
      );
  }
}
