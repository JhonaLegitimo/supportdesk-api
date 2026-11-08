type Status = "OPEN" 
type Priority = "LOW" | "MEDIUM" | "HIGH"

export type Ticket = {
  id: string;
  title: string;
  description: string;
  priority: Priority;
  status: Status;
  createdAt: string;
  updatedAt: string;
};