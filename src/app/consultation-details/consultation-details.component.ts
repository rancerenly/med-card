import { DatePipe } from '@angular/common';
import { Component, Input, OnChanges, OnInit } from '@angular/core';
import { Cons } from 'rxjs';
import { Consultation } from '../model/consultation.model';
import { ConsultationDetailsService } from '../services/consultation-details.service';

@Component({
  selector: 'app-consultation-details',
  templateUrl: './consultation-details.component.html',
  styleUrls: ['./consultation-details.component.scss']
})
export class ConsultationDetailsComponent implements OnInit {

  constructor(public consultDetailService: ConsultationDetailsService) { }

  @Input() isEdit = false;

  @Input() consultId = 0;

  @Input() consultation: Consultation = {
    id: 0,
    patientName: '',
    diagnosis: '',
    recommendation: '',
    department: '',
    doctorName: '',
    dateConclusion: new Date() 
  }
  
  ngOnInit(): void {

  }
  onConsultUpdate(consultation: Consultation): void {
    console.log("print update request")
    this.consultDetailService.update(consultation, this.consultId)
    .subscribe(
      (res) => console.log(res)
    );
  }

}
