import { Component, OnInit } from '@angular/core';
import { Consultation } from '../model/consultation.model';
import { ConsultationService } from '../services/consultation.service';

@Component({
  selector: 'app-add-consultation',
  templateUrl: './add-consultation.component.html',
  styleUrls: ['./add-consultation.component.scss']
})
export class AddConsultationComponent implements OnInit {

  constructor(private consultationService: ConsultationService ) { }

  consultation: Consultation = {
    patientName: '',
    diagnosis: '',
    recommendation: '',
    department: '',
    doctorName: ''
  }

  ngOnInit(): void {

  }
  onConsultCreate(consultation: Consultation): void {
    this.consultationService.postConsultation(consultation)
    .subscribe(
      (res) => console.log(res)
    );
  }

}
