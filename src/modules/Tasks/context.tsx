import React, { useState, useCallback, useEffect } from 'react';
import { TasksContextProps, Task } from './types';
import { addTask, getTasks, removeTask as removeFromStorage } from '.';


const TasksContext = React.createContext<TasksContextProps>({
    tasks: [],
    createTask() {},
    removeTask() {},
});

export const TasksProvider: React.FC = ({ children }) => {
    const [tasks, setTasks] = useState<Task[]>([]);

    useEffect(() => {
        getTasks()
            .then(tasks => setTasks(tasks));
    }, []);

    const createTask = useCallback(async (task: Task) => {
        const newTask = await addTask(task);
        setTasks(t => [...t, newTask]);
    }, []);

    const removeTask = useCallback((id: string) => {
        removeFromStorage(id);
        getTasks()
            .then(tasks => setTasks(tasks));
    }, []);

    return (
        <TasksContext.Provider value={{ tasks, createTask, removeTask }}>
            {children}
        </TasksContext.Provider>
    );
}

export default TasksContext;
