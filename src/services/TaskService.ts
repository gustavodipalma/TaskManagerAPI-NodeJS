import Repository from "../repositories/TaskRepository";
import {Task} from "../models/tasks";
import { CreateTaskDto } from "../dtos/create-task.dto";
import { UpdateTaskDto } from "../dtos/update-task.dto";

class TaskService {
  static async create(taskData: CreateTaskDto): Promise<Task> {
    if(!taskData.title || taskData.title.trim() === ""){
        throw new Error("Missing Title");
    }
    const task = await Repository.create(taskData);
    return task;
  }

  static async getAll(): Promise<Task[]> {
    const task = await Repository.getAll();
    return task;    
  }

  static async getById(id: string): Promise<Task | null> {
    const task = await Repository.getById(id);
    return task;
  }

  static async update(id: string, taskData: UpdateTaskDto): Promise<Task | null> {
    if(id == null || taskData == null) return null;
    const task = await Repository.update(id, taskData);
    return task;  
  }

  static async delete(id: string): Promise<boolean> {
    const task = await Repository.delete(id);
    return task;  
  }
}

export default TaskService;