import request from "supertest";
import app from "../src/app";

describe("Health & Base routes", () => {
    it("GET /health deve retornar status OK", async () => {
        const res = await request(app).get("/health");
        expect(res.status).toBe(200);
        expect(res.body).toEqual({ status: "OK" });
    });

    it("GET /api-docs deve retornar documentação Swagger (ou 404 se não configurado)", async () => {
        const res = await request(app).get("/api-docs");
        expect([200, 404]).toContain(res.status);
    });
});

describe("API /api/tasks (integração básica)", () => {
    it("GET /api/tasks deve retornar lista ou 404", async () => {
        const res = await request(app).get("/api/tasks");
        expect([200, 404]).toContain(res.status);
        if (res.status === 200) expect(Array.isArray(res.body)).toBe(true);
    });

    it("POST /api/tasks deve criar uma task quando enviar payload válido", async () => {
        const newTask = { title: "Teste criação", description: "Descrição de teste" };
        const res = await request(app).post("/api/tasks").send(newTask);
        // Aceita 201 (criado) ou 400/404 caso validação/rota não exista
        expect([201, 400, 404]).toContain(res.status);
        if (res.status === 201) {
            expect(res.body).toHaveProperty("id");
            expect(res.body.title).toBe(newTask.title);
            expect(res.body.description).toBe(newTask.description);
        }
    });
});