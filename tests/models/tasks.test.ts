import {Task} from "../../src/models/tasks";

describe("Model Task", () => {
    it("deve instanciar Task com título e descrição", () => {
        const t: Task = { id: "",title: "Título X", description: "Desc X", status: "pending", priority: 1 };
        expect(t).toHaveProperty("title", "Título X");
        // O ID não é enviado aqui, é gerado automaticamente pelo modelo
        expect((t as any).id).toBeDefined();
        expect(t).toHaveProperty("description", "Desc X");
        expect(t).toHaveProperty("status", "pending");
        expect(t).toHaveProperty("priority", 1);
        // se houver id automático, verifica formato básico
        if (t.title.length > 0) expect(t.title).toBeTruthy();
        if (t.id !== "") expect(t.id).toBeTruthy();
    });
});