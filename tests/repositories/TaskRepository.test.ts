import TaskRepository from "../../src/repositories/TaskRepository";

describe("TaskRepository - operações básicas", () => {

    let repo = TaskRepository;

    it("create deve adicionar e retornar objeto com id", () => {
        const created = repo.create({ title: "R1", description: "d", status: "pending", priority: 1 });
        expect(created).toHaveProperty("id");
        expect(created.title).toBe("R1");
    });

    it("findAll deve retornar array", () => {
        repo.create({ title: "R2", description: "d", status: "pending", priority: 2 });
        const all = repo.getAll();
        expect(Array.isArray(all)).toBe(true);
    });

    it("findById deve retornar item criado", () => {
        const created = repo.create({ title: "R3", description: "d", status: "pending", priority: 3 });
        const found = repo.getById(created.id);
        expect(found).toEqual(created);
    });

    it("update deve modificar registro existente", () => {
        const created = repo.create({ title: "R4", description: "d", status: "pending", priority: 4 });
        const updated = repo.update(created.id, { title: "R4-upd" });
        expect(updated).not.toBeNull();
        expect(updated!.title).toBe("R4-upd");
    });

    it("delete deve remover e retornar true quando removido", () => {
        const created = repo.create({ title: "R5", description: "d", status: "pending", priority: 5 });
        const removed = repo.delete(created.id);
        expect(removed).toBe(true);
    });
});