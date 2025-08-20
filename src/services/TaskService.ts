import Repository from "../repositories/TaskRepository";
import {Task} from "../models/tasks"

class TaskService {
  static create(taskData: Omit<Task, "id">): Task {
    if(!taskData.title || taskData.title.trim() === ""){
        throw new Error("Missing Title");
    }
    const task = Repository.create(taskData);
    return task;
  }

  static getAll(): Task[] {
    const task = Repository.getAll();
    return task;    
  }

  static getById(id: string): Task | null {
    const task = Repository.getById(id);
    return task;  
  }

  static update(id: string, data: Partial<Task>): Task | null {
    if(id == null || data == null) return null;
    const task = Repository.update(id,data);
    return task;  
  }

  static delete(id: string): boolean {
    const task = Repository.delete(id);
    return task;  
  }
}

export default TaskService;