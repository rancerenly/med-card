import { AfterViewInit, Component, OnInit, ViewChild } from '@angular/core';
import { Consultation, ConsultationPaginateI } from '../model/consultation.model';
import { ConsultationService } from '../services/consultation.service';
import { ConsultationDetailsService } from '../services/consultation-details.service';
import { MatTableDataSource } from '@angular/material/table';
import { MatPaginator, PageEvent } from '@angular/material/paginator';

@Component({
  selector: 'app-consultation',
  templateUrl: './consultation.component.html',
  styleUrls: ['./consultation.component.scss']
})
export class ConsultationComponent implements OnInit {

  isEdit: boolean = false;
  selectedConsultation!: Consultation;
  consultId = 0;
  dataSource = new MatTableDataSource<Consultation>();
  pageSizeOptions = [1, 2, 5];
  pageIndex: number;
  pageSize: number;
  length: number;


  displayedColumns: string[] = ['position','patientName', 'doctorName', 'dateConclusion', 'diagnosis', 'actions'];
  @ViewChild(MatPaginator) paginator: MatPaginator;

  consultations: Consultation[] = [];


  pageEvent: PageEvent;
  
  constructor(private consultService: ConsultationService, private consultDetailSerivce: ConsultationDetailsService) { }

 

  ngOnInit(): void {
    this.dataSource.paginator = this.paginator;
    this.getConsultations(5,0);
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
      this.getConsultations(this.pageIndex, this.pageSize);
    });
  }
  }

  getConsultations(size: number, page: number) {
    this.consultService.getConsultations(size, page)
    .subscribe((data: ConsultationPaginateI) => 
    {
      this.consultations = data.items;
      this.consultations.length = data.meta.totalItems;
      this.dataSource.data = this.consultations;
      this.length = data.meta.totalItems;
      this.dataSource.paginator = this.paginator;
    }
    );
  }

  getNextData(currentSize: number, pageSize: number, limit: number){
    this.consultService.getConsultations(limit, pageSize)
    .subscribe((data: ConsultationPaginateI) => {

      this.consultations.length = currentSize;

      this.consultations.push(...data.items);

      this.consultations.length = data.meta.totalItems;

      this.dataSource.data = this.consultations;
      this.dataSource._updateChangeSubscription();

      this.dataSource.paginator = this.paginator;
  
    },
    );
  }

  handlePageEvent(event: PageEvent) {
    
    let pageIndex = event.pageIndex;
    let pageSize = event.pageSize;

    let previousSize = pageSize * pageIndex;
    this.getNextData(previousSize, pageIndex, pageSize);
    
    return event;
 }
}
