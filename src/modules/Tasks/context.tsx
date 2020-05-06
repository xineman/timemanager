import React, { useState, useCallback, useEffect } from 'react';
import { addItem, getItems, removeItem } from 'services/storage';
import { TasksContextProps, Task, CreateTaskDTO } from './types';

const TasksContext = React.createContext<TasksContextProps>({
    tasks: [],
    createTask() {},
    removeTask() {},
});

export const TasksProvider: React.FC = ({ children }) => {
    const [tasks, setTasks] = useState<Task[]>([]);

    useEffect(() => {
        getItems<Task>('tasks').then((t) => setTasks(t));
    }, []);

    const createTask = useCallback(async (task: Task) => {
        const newTask = await addItem<CreateTaskDTO>('tasks', task);
        setTasks((t) => [...t, newTask]);
    }, []);

    const removeTask = useCallback(async (id: string) => {
        await removeItem('tasks', id);
        getItems<Task>('tasks').then((t) => setTasks(t));
    }, []);

    return (
        <TasksContext.Provider value={{ tasks, createTask, removeTask }}>
            {children}
        </TasksContext.Provider>
    );
};

export default TasksContext;
