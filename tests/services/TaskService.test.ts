import TaskService from "../../src/services/TaskService";

describe("TaskService - lógica de negócio (uso de métodos estáticos)", () => {
    beforeEach(() => {
        // se o repositório expor algum reset/clear, chame aqui.
        // Ex: (require("../../src/repositories/TaskRepository") as any).reset?.();
    });

    it("create deve criar e retornar task com id", () => {
        const created = TaskService.create({ title: "S1", description: "d", status: "pending", priority: 1 });
        expect(created).toHaveProperty("id");
        expect(created.title).toBe("S1");
    });

    it("create deve lançar erro quando o título estiver ausente", () => {
        expect(() => TaskService.create({ title: "", description: "d" } as any)).toThrow("Missing Title");
    });

    it("getAll deve retornar array", () => {
        TaskService.create({ title: "S2", description: "d", status: "pending", priority: 2 });
        const all = TaskService.getAll();
        expect(Array.isArray(all)).toBe(true);
    });

    it("getById deve retornar task criada", () => {
        const created = TaskService.create({ title: "S3", description: "d", status: "pending", priority: 3 });
        const found = TaskService.getById(created.id);
        expect(found).toEqual(created);
    });

    it("update deve atualizar dados e retornar objeto atualizado", () => {
        const created = TaskService.create({ title: "S4", description: "d", status: "pending", priority: 4 });
        const updated = TaskService.update(created.id, { title: "S4-upd" });
        // Se a implementação retornar null em falha, garantimos que não seja null antes de acessar props
        expect(updated).not.toBeNull();
        if (updated) expect(updated.title).toBe("S4-upd");
    });

    it("delete deve remover e retornar true", () => {
        const created = TaskService.create({ title: "S5", description: "d", status: "pending", priority: 5 });
        const removed = TaskService.delete(created.id);
        expect(removed).toBe(true);
        const shouldBeNull = TaskService.getById(created.id);
        expect(shouldBeNull).toBeNull();
    });
});