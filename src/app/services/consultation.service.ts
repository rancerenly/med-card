import { Injectable } from '@angular/core';

import { Consultation, ConsultationPaginateI } from '../model/consultation.model';
import { Observable, of } from 'rxjs';
import { HttpClient, HttpParams } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class ConsultationService {

  url = "http://localhost:3000/consultation";

  constructor(private http: HttpClient) {}

  /*getConsultations() {
    return this.http.get<Consultation[]>(this.url);
  }*/

  getConsultations(limit: number, page: number) {
    let params = new HttpParams();
    page++;
    params = params.set('page', page);
    params = params.set('limit', limit);
    console.log(this.url + '?' + params.toString());
    return this.http.get<ConsultationPaginateI>(this.url + '?' + params.toString());
  }

  postConsultation(consultation: Consultation) {
    return this.http.post<Consultation>(this.url, consultation);
  }
}
