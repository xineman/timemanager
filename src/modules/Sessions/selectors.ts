import { ObjectMap } from 'services/types';
import { useMemo, useContext } from 'react';
import { usePlansWithTasks } from 'modules/Plans/selectors';
import { PlanWithTask } from 'modules/Plans/types';
import { SessionWithPlan } from './types';
import SessionsContext from './context';

/* eslint-disable import/prefer-default-export */
export const useSessionsWithPlans = () => {
    const plans = usePlansWithTasks();
    const { sessions } = useContext(SessionsContext);
    return useMemo<SessionWithPlan[]>(() => {
        const plansMap: ObjectMap<PlanWithTask> = {};
        plans.forEach((t) => {
            plansMap[t.id] = t;
        });
        return sessions.map((p) => ({
            ...p,
            plan: plansMap[p.planId],
        }));
    }, [plans, sessions]);
};
