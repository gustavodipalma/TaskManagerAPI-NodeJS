import TaskService from "../../src/services/TaskService";
import TaskRepository from "../../src/repositories/TaskRepository";
import { CreateTaskDto } from "../../src/dtos/create-task.dto";
import { UpdateTaskDto } from "../../src/dtos/update-task.dto";
import { Task } from "../../src/models/tasks";

jest.mock("../../src/repositories/TaskRepository");

describe("TaskService - Testes Unitários com Mocks", () => {
    const mockRepository = TaskRepository as jest.Mocked<typeof TaskRepository>;

    beforeEach(() => {
        jest.clearAllMocks();
    });

    describe("create", () => {
        it("deve chamar o repositório com os dados corretos e retornar a tarefa criada", async () => {
            const taskDto: CreateTaskDto = { title: "Nova Tarefa", description: "Desc", status: "pending", priority: 1 };
            const expectedTask: Task = { id: "uuid-123", ...taskDto };

            mockRepository.create.mockResolvedValue(expectedTask);

            const result = await TaskService.create(taskDto);

            expect(result).toEqual(expectedTask);
            expect(mockRepository.create).toHaveBeenCalledWith(taskDto);
            expect(mockRepository.create).toHaveBeenCalledTimes(1);
        });

        it("deve lançar um erro se o título estiver vazio", async () => {
            const taskDto: CreateTaskDto = { title: "", description: "Desc", status: "pending", priority: 1 };
            
            await expect(TaskService.create(taskDto)).rejects.toThrow("Missing Title");
            
            expect(mockRepository.create).not.toHaveBeenCalled();
        });
    });

    describe("getAll", () => {
        it("deve retornar todas as tarefas do repositório", async () => {
            const tasks: Task[] = [{ id: "1", title: "T1", status: "done", priority: 1 }];
            mockRepository.getAll.mockResolvedValue(tasks);

            const result = await TaskService.getAll();

            expect(result).toEqual(tasks);
            expect(mockRepository.getAll).toHaveBeenCalledTimes(1);
        });
    });

    describe("getById", () => {
        it("deve retornar uma tarefa se o id existir", async () => {
            const task: Task = { id: "1", title: "T1", status: "done", priority: 1 };
            mockRepository.getById.mockResolvedValue(task);

            const result = await TaskService.getById("1");

            expect(result).toEqual(task);
            expect(mockRepository.getById).toHaveBeenCalledWith("1");
        });

        it("deve retornar null se o id não existir", async () => {
            mockRepository.getById.mockResolvedValue(null);
            const result = await TaskService.getById("999");
            expect(result).toBeNull();
        });
    });

    describe("update", () => {
        it("deve chamar o update do repositório e retornar a tarefa atualizada", async () => {
            const updateDto: UpdateTaskDto = { title: "Título Atualizado" };
            const updatedTask: Task = { id: "1", title: "Título Atualizado", status: "pending", priority: 1 };
            mockRepository.update.mockResolvedValue(updatedTask);

            const result = await TaskService.update("1", updateDto);

            expect(result).toEqual(updatedTask);
            expect(mockRepository.update).toHaveBeenCalledWith("1", updateDto);
        });

        it("deve retornar null se os dados de atualização forem nulos", async () => {
            // Este teste de lógica de negócios permanece síncrono, o que está correto
            const result = await TaskService.update("1", null as any);
            expect(result).toBeNull();
            expect(mockRepository.update).not.toHaveBeenCalled();
        });
    });

    describe("delete", () => {
        it("deve chamar o delete do repositório e retornar true", async () => {
            mockRepository.delete.mockResolvedValue(true);
            const result = await TaskService.delete("1");
            expect(result).toBe(true);
            expect(mockRepository.delete).toHaveBeenCalledWith("1");
        });

        it("deve retornar false se o delete do repositório retornar false", async () => {
            mockRepository.delete.mockResolvedValue(false);
            const result = await TaskService.delete("999");
            expect(result).toBe(false);
        });
    });
});
