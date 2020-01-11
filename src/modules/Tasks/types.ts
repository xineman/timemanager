export interface Task {
    id: string;
    name: string;
    targetTime: number;
    sessionsNumber?: number;
    category?: number;
}

export interface TasksContextProps {
    tasks: Task[];
    createTask(task: CreateTaskDTO): void;
    removeTask(id: string): void;
}

export type CreateTaskDTO = Omit<Task, 'id'>;
