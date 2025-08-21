import Repository from "../repositories/TaskRepository";
import {Task} from "../models/tasks";
import { CreateTaskDto } from "../dtos/create-task.dto";
import { UpdateTaskDto } from "../dtos/update-task.dto";

class TaskService {
  static create(taskData: CreateTaskDto): Task {
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

  static update(id: string, taskData: UpdateTaskDto): Task | null {
    if(id == null || taskData == null) return null;
    const task = Repository.update(id, taskData);
    return task;  
  }

  static delete(id: string): boolean {
    const task = Repository.delete(id);
    return task;  
  }
}

export default TaskService;