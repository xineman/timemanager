import { ObjectMap } from 'services/types';
import { useMemo, useContext } from 'react';
import { Task } from 'modules/Tasks/types';
import TasksContext from 'modules/Tasks/context';
import { PlanWithTask } from './types';
import PlansContext from './context';

/* eslint-disable import/prefer-default-export */
export const usePlansWithTasks = () => {
    const { plans } = useContext(PlansContext);
    const { tasks } = useContext(TasksContext);
    return useMemo<PlanWithTask[]>(() => {
        const tasksMap: ObjectMap<Task> = {};
        tasks.forEach((t) => {
            tasksMap[t.id] = t;
        });
        return plans.map((p) => ({
            ...p,
            task: tasksMap[p.taskId],
        }));
    }, [plans, tasks]);
};
