export interface User {
  name: string;
  email: string;
}

export interface Report {
  id: number;
  protocol: string;
  createdAt: Date;
  resolvedAt: Date | null;
  userId: number;
  focusType: string;
  description: string;
  location: string;
  observationDate: Date;
  status: string;
  fileUrl: string | null;
  user: User;
}