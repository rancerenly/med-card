import { Meta } from "@angular/platform-browser";

export interface Consultation {
  id: number;
  patientName: string;
  doctorName: string;
  dateConclusion: Date;
  recommendation: string;
  diagnosis: string;
  department: string;
}

export interface ConsultationPaginateI {
  items: Consultation[];
  meta: PaginationI;
}

export interface PaginationI {
  totalItems: number,
  itemCount: number,
  itemsPerPage: number,
  totalPages: number,
  currentPage: number,
}