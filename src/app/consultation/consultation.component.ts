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
    console.log(consultId);
    this.isEdit = true;
    this.selectedConsultation = consultation;
    this.consultId = consultId;
  }

  onDelete(consultation: Consultation): void {
    this.selectedConsultation = consultation;
    if(this.selectedConsultation.id) {
      this.consultId = this.selectedConsultation.id;
    this.consultDetailSerivce.deleteConsultation(this.consultId).subscribe(() => {
      console.log("consultation deleted");
      this.getConsultations();
    });
  }
  }

  getConsultations(): void {
    this.consultService.getConsultations().subscribe((data: Consultation[]) => 
    {
      this.consultations = data;
      console.log(data)}
    );
  }

}
