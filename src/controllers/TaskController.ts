import { Request, Response } from "express";
import Service from "../services/TaskService";

class TaskController {
  static create(req: Request, res: Response) {
    try{
      const task = Service.create(req.body);
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
    try{
      const {id} = req.params;
      const task = Service.update(id,req.body);
      res.status(200).json(task);
    }
    catch(error: any){
      res.status(400).json({error: error.message});
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
