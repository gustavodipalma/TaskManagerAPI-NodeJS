import {Task} from "../models/tasks";
import {v4 as uuidv4} from "uuid";

class TaskRepository {
    private static tasks: Task[] = [];

    static create(taskData: Omit<Task, "id">): Task {
        const task: Task = {id: uuidv4(), ... taskData};
        this.tasks.push(task);
        return task;
    }

    static getAll(): Task[] {
        return this.tasks;
    }

    static getById(id: string): Task | null {
        return this.tasks.find(t => t.id === id) || null;
    }

    static update(id: string, data: Partial<Task>): Task | null {
        const task = this.getById(id);
        if(!task) return null;
        Object.assign(task, data);
        return task;
    }

    static delete(id: string): boolean {
        const index = this.tasks.findIndex(t => t.id === id);
        if(index === -1) return false;
        this.tasks.splice(index, 1);
        return true;
    }
}

export default TaskRepository;