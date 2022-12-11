import { Injectable } from '@angular/core';

import { Consultation } from '../model/consultation.model';
import { Observable, of } from 'rxjs';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class ConsultationService {

  url = "http://localhost:3000/consultation";
  
  constructor(private http: HttpClient) {}

  getConsultations() {
    return this.http.get<Consultation[]>(this.url);
  }
}
