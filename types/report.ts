export interface Report {
  id: number;
  protocol: string;
  createdAt: Date;
  resolvedAt?: Date;
  userId: number;
  focusType: string;
  description: string;
  location: string;
  observationDate: Date;
  status: string;
  fileUrl?: string;
  fileDescription?: string;
}