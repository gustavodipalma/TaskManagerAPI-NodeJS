import { Task } from '../models/tasks';
import { db } from '../config/firebase';

class TaskRepository {
    private static tasksCollection = db.collection('tasks');

    static async create(taskData: Omit<Task, 'id'>): Promise<Task> {
        const docRef = await this.tasksCollection.add(taskData);
        // Atualiza o documento recém-criado para incluir seu próprio ID
        await docRef.update({ id: docRef.id });
        const snapshot = await docRef.get();
        return snapshot.data() as Task;
    }

    static async getAll(): Promise<Task[]> {
        const snapshot = await this.tasksCollection.get();
        return snapshot.docs.map(doc => doc.data() as Task);
    }

    static async getById(id: string): Promise<Task | null> {
        const doc = await this.tasksCollection.doc(id).get();
        if (!doc.exists) {
            return null;
        }
        return doc.data() as Task;
    }

    static async update(id: string, data: Partial<Omit<Task, 'id'>>): Promise<Task | null> {
        const docRef = this.tasksCollection.doc(id);
        const doc = await docRef.get();
        if (!doc.exists) {
            return null;
        }
        await docRef.update(data);
        const updatedDoc = await docRef.get();
        return updatedDoc.data() as Task;
    }

    static async delete(id: string): Promise<boolean> {
        const docRef = this.tasksCollection.doc(id);
        const doc = await docRef.get();
        if (!doc.exists) {
            return false;
        }
        await docRef.delete();
        return true;
    }

    // Método para limpar a coleção, usado apenas em testes
    static async clear(): Promise<void> {
        const snapshot = await this.tasksCollection.get();
        const batch = db.batch();
        snapshot.docs.forEach(doc => {
            batch.delete(doc.ref);
        });
        await batch.commit();
    }
}

export default TaskRepository;
