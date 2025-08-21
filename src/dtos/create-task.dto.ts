export interface CreateTaskDto {
  title: string;
  description?: string;
  status: "pending" | "waiting" | "done";
  priority: 1 | 2 | 3 | 4 | 5;
}
