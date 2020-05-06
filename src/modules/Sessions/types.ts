import { PlanWithTask } from 'modules/Plans/types';

export interface Session {
    id: string;
    planId: string;
    startDate: Date;
    workingTime: number;
}

export interface SessionWithPlan extends Session {
    plan: PlanWithTask;
}

export interface SessionsContextProps {
    sessions: Session[];
    createSession(session: CreateSessionDTO): void;
    removeSession(id: string): void;
}

export type CreateSessionDTO = Omit<Session, 'id'>;
