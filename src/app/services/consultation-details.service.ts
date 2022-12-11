import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/internal/Observable';
import { of } from 'rxjs/internal/observable/of';
import { Consultation } from '../model/consultation.model';

@Injectable({
  providedIn: 'root'
})
export class ConsultationDetailsService {

  url = "http://localhost:3000/consultation";
  consultation?: Consultation;

  constructor(private http: HttpClient) { }

  update(consultation: Consultation) {
    this.consultation = consultation;
  }
  
  deleteConsultation(consultId: number) {
    return this.http.delete(this.url + '/' + consultId);
  }
}
