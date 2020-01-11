import AsyncStorage from '@react-native-community/async-storage';
import uuid from 'uuid/v1';
import { Task, CreateTaskDTO } from './types';


const TASKS_KEY = 'tasks';

export const getTasks = async () => {
    const storedTasks = await AsyncStorage.getItem(TASKS_KEY);
    if (storedTasks === null) {
        AsyncStorage.setItem(TASKS_KEY, JSON.stringify([]));
        return [];
    }
    return JSON.parse(storedTasks);
}

export const addTask = async (task: CreateTaskDTO) => {
    const existing = await getTasks();
    const taskToAdd: Task = {
        id: uuid(),
        ...task,
    };
    existing.push(taskToAdd);
    await AsyncStorage.setItem(TASKS_KEY, JSON.stringify(existing));
    return taskToAdd;
}

export const removeTask = async (id: string) => {
    const existing: Task[] = await getTasks();
    const indexToRemove = existing.findIndex((t: Task) => t.id === id);
    if (indexToRemove !== -1) {
        existing.splice(indexToRemove, 1);
        await AsyncStorage.setItem(TASKS_KEY, JSON.stringify(existing));
    } else {
        throw new Error(`Task with id ${id} does not exist`);
    }
}
