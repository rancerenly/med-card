import { Component, OnInit } from '@angular/core';
import { Consultation } from '../model/consultation.model';
import { ConsultationService } from '../services/consultation.service';
import { ConsultationDetailsService } from '../services/consultation-details.service';
import { MatTableDataSource } from '@angular/material/table';

@Component({
  selector: 'app-consultation',
  templateUrl: './consultation.component.html',
  styleUrls: ['./consultation.component.scss']
})
export class ConsultationComponent implements OnInit {
  
  dataSource = new MatTableDataSource([]);
  constructor(private consultService: ConsultationService, private consultDetailSerivce: ConsultationDetailsService) { }

  consultations: Consultation[] = [];

  selectedConsultation!: Consultation;

  ngOnInit(): void {
    this.getConsultations();
  }

  onReadMore(consultation: Consultation): void {
    this.selectedConsultation = consultation;
  }
  onUpdate(consultation: Consultation) {
    
  }

  onDelete(consultation: Consultation): void {
    this.selectedConsultation = consultation;
    console.log(`on delete ${this.selectedConsultation.id}`)
    this.consultDetailSerivce.deleteConsultation(this.selectedConsultation.id).subscribe(() => {
      console.log("consultation deleted");
      this.getConsultations();
    });
  }

  getConsultations(): void {
    this.consultService.getConsultations().subscribe((data: Consultation[]) => 
    {this.consultations = data;
    console.log(data)}
    );
  }

}
