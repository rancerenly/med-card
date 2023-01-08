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
  
  dataSource = new MatTableDataSource<Consultation>();
  constructor(private consultService: ConsultationService, private consultDetailSerivce: ConsultationDetailsService) { }

  displayedColumns: string[] = ['position','patientName', 'doctorName', 'dateConclusion', 'diagnosis', 'actions'];

  consultations: Consultation[] = [];
  isEdit: boolean = false;
  selectedConsultation!: Consultation;
  consultId = 0;

  ngOnInit(): void {
    this.getConsultations();
  }

  onReadMore(consultation: Consultation): void {
    this.isEdit = false;
    this.selectedConsultation = consultation;
  }
  onUpdate(consultation: Consultation, consultId: number) {
    this.isEdit = true;
    this.selectedConsultation = consultation;
    this.consultId = consultId;
  }

  onDelete(consultation: Consultation): void {
    this.selectedConsultation = consultation;
    if(this.selectedConsultation.id) {
      this.consultId = this.selectedConsultation.id;
    this.consultDetailSerivce.deleteConsultation(this.consultId).subscribe(() => {
      this.getConsultations();
    });
  }
  }

  getConsultations(): void {
    this.consultService.getConsultations().subscribe((data: Consultation[]) => 
    {
      this.consultations = data;
      this.dataSource.data = this.consultations;
     
    }
    );
  }

}
