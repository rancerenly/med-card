export interface Consultation {
  id?: number;
  patientName: string;
  doctorName: string;
  dateConclusion?: Date;
  recommendation: string;
  diagnosis: string;
  department: string;
}

