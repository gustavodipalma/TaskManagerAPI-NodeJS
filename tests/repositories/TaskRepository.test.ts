import TaskRepository from "../../src/repositories/TaskRepository";
import { Task } from "../../src/models/tasks";

describe("TaskRepository - Testes Unitários", () => {
    beforeEach(async () => {
        await TaskRepository.clear();
    });

    it("create deve adicionar uma tarefa e retorná-la com um id", async () => {
        const taskData: Omit<Task, 'id'> = { title: "R1", description: "d", status: "pending", priority: 1 };
        const created = await TaskRepository.create(taskData);
        expect(created).toHaveProperty("id");
        expect(created.title).toBe("R1");
        expect(await TaskRepository.getAll()).toHaveLength(1);
    });

    it("getAll deve retornar todas as tarefas", async () => {
        const task1: Omit<Task, 'id'> = { title: "R2.1", description: "d", status: "pending", priority: 2 };
        const task2: Omit<Task, 'id'> = { title: "R2.2", description: "d", status: "waiting", priority: 3 };
        await TaskRepository.create(task1);
        await TaskRepository.create(task2);
        const all = await TaskRepository.getAll();
        expect(Array.isArray(all)).toBe(true);
        expect(all).toHaveLength(2);
    });

    it("getAll deve retornar um array vazio quando o repositório estiver limpo", async () => {
        const all = await TaskRepository.getAll();
        expect(all).toEqual([]);
    });

    it("getById deve retornar a tarefa correta", async () => {
        const taskData: Omit<Task, 'id'> = { title: "R3", description: "d", status: "pending", priority: 3 };
        const created = await TaskRepository.create(taskData);
        const found = await TaskRepository.getById(created.id);
        expect(found).toEqual(created);
    });

    it("getById deve retornar null para um id inexistente", async () => {
        const found = await TaskRepository.getById("id-que-nao-existe");
        expect(found).toBeNull();
    });

    it("update deve modificar e retornar a tarefa atualizada", async () => {
        const taskData: Omit<Task, 'id'> = { title: "R4", description: "d", status: "pending", priority: 4 };
        const created = await TaskRepository.create(taskData);
        const updated = await TaskRepository.update(created.id, { title: "R4-upd" });
        expect(updated).not.toBeNull();
        expect(updated!.title).toBe("R4-upd");
    });

    it("update deve retornar null para um id inexistente", async () => {
        const updated = await TaskRepository.update("id-que-nao-existe", { title: "novo-titulo" });
        expect(updated).toBeNull();
    });

    it("delete deve remover a tarefa e retornar true", async () => {
        const taskData: Omit<Task, 'id'> = { title: "R5", description: "d", status: "pending", priority: 5 };
        const created = await TaskRepository.create(taskData);
        const removed = await TaskRepository.delete(created.id);
        expect(removed).toBe(true);
        expect(await TaskRepository.getById(created.id)).toBeNull();
    });

    it("delete deve retornar false para um id inexistente", async () => {
        const removed = await TaskRepository.delete("id-que-nao-existe");
        expect(removed).toBe(false);
    });
});