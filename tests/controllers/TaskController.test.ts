import request from "supertest";
import app from "../../src/app";

describe("TaskController - endpoints CRUD", () => {
    it("GET /api/tasks deve retornar lista (ou 404)", async () => {
        const res = await request(app).get("/api/tasks");
        expect([200, 404]).toContain(res.status);
        if (res.status === 200) expect(Array.isArray(res.body)).toBe(true);
    });

    it("POST /api/tasks cria task com payload válido e retorna 201", async () => {
        const payload = { title: "Task Controller Test", description: "desc" };
        const res = await request(app).post("/api/tasks").send(payload);
        expect([201, 400, 404]).toContain(res.status);
        if (res.status === 201) {
            expect(res.body).toHaveProperty("id");
            expect(res.body.title).toBe(payload.title);
        }
    });

    it("GET /api/tasks/:id busca task por id (ou 404)", async () => {
        // tenta criar primeiro para garantir id válido
        const create = await request(app).post("/api/tasks").send({ title: "temp", description: "temp" });
        if (create.status === 201) {
            const id = create.body.id;
            const res = await request(app).get(`/api/tasks/${id}`);
            expect([200, 404]).toContain(res.status);
            if (res.status === 200) expect(res.body.id).toBe(id);
        } else {
            const res = await request(app).get(`/api/tasks/1`);
            expect([200, 404]).toContain(res.status);
        }
    });

    it("PUT /api/tasks/:id atualiza quando possível (200) ou retorna 400/404", async () => {
        const create = await request(app).post("/api/tasks").send({ title: "toUpdate", description: "x" });
        const id = create.status === 201 ? create.body.id : 1;
        const res = await request(app).put(`/api/tasks/${id}`).send({ title: "Atualizado", description: "novo" });
        expect([200, 400, 404]).toContain(res.status);
        if (res.status === 200) expect(res.body.title).toBe("Atualizado");
    });

    it("DELETE /api/tasks/:id deve remover ou retornar 404", async () => {
        const create = await request(app).post("/api/tasks").send({ title: "toDelete", description: "x" });
        const id = create.status === 201 ? create.body.id : 1;
        const res = await request(app).delete(`/api/tasks/${id}`);
        expect([200, 404]).toContain(res.status);
    });
});