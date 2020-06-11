import React, { useState, useCallback, useEffect } from 'react';
import { addItem, getItems, removeItem } from 'services/storage';
import { SessionsContextProps, Session, CreateSessionDTO } from './types';

const SessionsContext = React.createContext<SessionsContextProps>({
    sessions: [],
    createSession() {},
    removeSession() {},
});

export const SessionsProvider: React.FC = ({ children }) => {
    const [sessions, setSessions] = useState<Session[]>([]);

    useEffect(() => {
        getItems<Session>('sessions').then((t) =>
            setSessions(
                t.map((s) => ({ ...s, startDate: new Date(s.startDate) }))
            )
        );
    }, []);

    const createSession = useCallback(async (task: Session) => {
        const newTask = await addItem<CreateSessionDTO>('sessions', task);
        setSessions((t) => [...t, newTask]);
    }, []);

    const removeSession = useCallback(async (id: string) => {
        await removeItem('sessions', id);
        getItems<Session>('sessions').then((t) => setSessions(t));
    }, []);

    return (
        <SessionsContext.Provider
            value={{ sessions, createSession, removeSession }}
        >
            {children}
        </SessionsContext.Provider>
    );
};

export default SessionsContext;
