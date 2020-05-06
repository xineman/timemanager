import { Task } from 'modules/Tasks/types';

export interface Plan {
    id: string;
    taskId: string;
    plannedTime: number;
}

export interface PlanWithTask extends Plan {
    task: Task;
}

export interface PlansContextProps {
    plans: Plan[];
    createPlan(plan: CreatePlanDTO): void;
    removePlan(id: string): void;
}

export type CreatePlanDTO = Omit<Plan, 'id'>;
