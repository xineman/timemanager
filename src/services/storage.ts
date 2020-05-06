import AsyncStorage from '@react-native-community/async-storage';
import uuid from 'uuid/v1';

export const PLANS_KEY = 'plans';
export const TASKS_KEY = 'tasks';

type Key = 'plans' | 'tasks' | 'sessions';

interface Item {
    id: string;
}

export const getItems = async <T extends Item>(key: Key) => {
    const storedItems = await AsyncStorage.getItem(key);
    if (storedItems === null) {
        AsyncStorage.setItem(key, JSON.stringify([]));
        return [];
    }
    return JSON.parse(storedItems) as T[];
};

export const addItem = async <T>(key: Key, item: T) => {
    const existing = await getItems(key);
    const itemToAdd: T & Item = {
        id: uuid(),
        ...item,
    };
    existing.push(itemToAdd);
    await AsyncStorage.setItem(key, JSON.stringify(existing));
    return itemToAdd;
};

export const removeItem = async <T extends Item>(key: Key, id: string) => {
    const existing: T[] = await getItems(key);
    const indexToRemove = existing.findIndex((t: T) => t.id === id);
    if (indexToRemove !== -1) {
        existing.splice(indexToRemove, 1);
        await AsyncStorage.setItem(key, JSON.stringify(existing));
    } else {
        throw new Error(`Item with id ${id} does not exist`);
    }
};
