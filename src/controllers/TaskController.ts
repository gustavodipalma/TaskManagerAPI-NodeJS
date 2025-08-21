import { Request, Response } from "express";
import Service from "../services/TaskService";
import { CreateTaskDto } from "../dtos/create-task.dto";
import { UpdateTaskDto } from "../dtos/update-task.dto";

class TaskController {
  static create(req: Request, res: Response) {
    try{
      const createTaskDto: CreateTaskDto = req.body;
      const task = Service.create(createTaskDto);
      res.status(201).json(task);
    }
    catch(error: any){
      res.status(400).json({error: error.message});
    }
  }

  static async getAll(req: Request, res: Response) {
    try{
      const task = Service.getAll();
      res.status(200).json(task);
    }
    catch(error: any){
      res.status(400).json({error: error.message});
    }
  }

  static async getById(req: Request, res: Response) {
    try{
      const {id} = req.params;
      const task = Service.getById(id);
      if(!task) return res.status(404).json({error: "task not found"});
      res.status(200).json(task);
    }
    catch(error: any){
      res.status(400).json({error: error.message});
    }
  }

  static async update(req: Request, res: Response) {
    try {
      const { id } = req.params;
      const updateTaskDto: UpdateTaskDto = req.body;
      const task = Service.update(id, updateTaskDto);

      // Se o serviço retornar null, a tarefa não foi encontrada
      if (!task) {
        return res.status(404).json({ error: "task not found" });
      }

      res.status(200).json(task);
    } catch (error: any) {
      res.status(400).json({ error: error.message });
    }
  }

  static async delete(req: Request, res: Response) {
    try{
      const {id} = req.params;
      const task = Service.delete(id);
      if(!task) return res.status(404).json({error: "task not found"});
      res.status(200).json({status: "task deleted"});
    }
    catch(error: any){
      res.status(400).json({error: error.message});
    }
  }
}

export default TaskController;
