import request from "supertest";
import app from "../../src/app";
import TaskRepository from "../../src/repositories/TaskRepository";
import { CreateTaskDto } from "../../src/dtos/create-task.dto";

describe("TaskController - Testes de Integração", () => {

    // Limpa o banco de dados em memória antes de cada teste
    beforeEach(() => {
        TaskRepository.clear();
    });

    describe("POST /api/tasks", () => {
        it("deve criar uma tarefa com dados válidos e retornar 201", async () => {
            const payload: CreateTaskDto = { title: "Task C1", description: "desc", status: "pending", priority: 1 };
            const res = await request(app).post("/api/tasks").send(payload);
            
            expect(res.status).toBe(201);
            expect(res.body).toHaveProperty("id");
            expect(res.body.title).toBe(payload.title);
        });

        it("deve retornar 400 ao tentar criar uma tarefa sem título", async () => {
            const payload = { description: "desc", status: "pending", priority: 1 };
            const res = await request(app).post("/api/tasks").send(payload);

            expect(res.status).toBe(400);
            expect(res.body).toHaveProperty("error", "Missing Title");
        });
    });

    describe("GET /api/tasks", () => {
        it("deve retornar 200 e um array vazio se não houver tarefas", async () => {
            const res = await request(app).get("/api/tasks");
            expect(res.status).toBe(200);
            expect(res.body).toEqual([]);
        });

        it("deve retornar 200 e uma lista de tarefas", async () => {
            const payload: CreateTaskDto = { title: "Task G1", description: "desc", status: "pending", priority: 1 };
            await request(app).post("/api/tasks").send(payload);

            const res = await request(app).get("/api/tasks");
            expect(res.status).toBe(200);
            expect(res.body).toHaveLength(1);
            expect(res.body[0].title).toBe(payload.title);
        });
    });

    describe("GET /api/tasks/:id", () => {
        it("deve retornar 200 e a tarefa correta se o id existir", async () => {
            const created = await request(app).post("/api/tasks").send({ title: "Task G2", status: "pending", priority: 1 });
            const taskId = created.body.id;

            const res = await request(app).get(`/api/tasks/${taskId}`);
            expect(res.status).toBe(200);
            expect(res.body.id).toBe(taskId);
        });

        it("deve retornar 404 se o id não existir", async () => {
            const res = await request(app).get(`/api/tasks/id-invalido`);
            expect(res.status).toBe(404);
            expect(res.body).toHaveProperty("error", "task not found");
        });
    });

    describe("PUT /api/tasks/:id", () => {
        it("deve retornar 200 e a tarefa atualizada se o id existir", async () => {
            const created = await request(app).post("/api/tasks").send({ title: "Task P1", status: "pending", priority: 1 });
            const taskId = created.body.id;
            const updatePayload = { title: "Título Atualizado" };

            const res = await request(app).put(`/api/tasks/${taskId}`).send(updatePayload);
            expect(res.status).toBe(200);
            expect(res.body.title).toBe(updatePayload.title);
        });

        it("deve retornar 404 se o id a ser atualizado não existir", async () => {
            const res = await request(app).put(`/api/tasks/id-invalido`).send({ title: "..." });
            expect(res.status).toBe(404);
        });
    });

    describe("DELETE /api/tasks/:id", () => {
        it("deve retornar 200 e uma mensagem de sucesso se o id existir", async () => {
            const created = await request(app).post("/api/tasks").send({ title: "Task D1", status: "pending", priority: 1 });
            const taskId = created.body.id;

            const res = await request(app).delete(`/api/tasks/${taskId}`);
            expect(res.status).toBe(200);
            expect(res.body).toEqual({ status: "task deleted" });
        });

        it("deve retornar 404 se o id a ser deletado não existir", async () => {
            const res = await request(app).delete(`/api/tasks/id-invalido`);
            expect(res.status).toBe(404);
        });
    });
});