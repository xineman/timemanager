import { ObjectMap } from 'services/types';
import { useMemo, useContext } from 'react';
import { usePlansWithTasks } from 'modules/Plans/selectors';
import { PlanWithTask } from 'modules/Plans/types';
import { SessionWithPlan, Session } from './types';
import SessionsContext from './context';

export const useSessionsWithPlans = () => {
    const plans = usePlansWithTasks();
    const sessionsByPlanMap = useSessionsPerPlan();
    const { sessions } = useContext(SessionsContext);
    return useMemo<SessionWithPlan[]>(() => {
        const plansMap: ObjectMap<PlanWithTask> = {};
        plans.forEach((t) => {
            plansMap[t.id] = t;
        });
        return sessions.map((s) => ({
            ...s,
            plan: plansMap[s.planId],
            accumulatedTime: sessionsByPlanMap[s.planId]
                .slice(0, sessionsByPlanMap[s.planId].indexOf(s) + 1)
                .reduce((acc, c) => acc + c.workingTime, 0),
        }));
    }, [plans, sessions, sessionsByPlanMap]);
};

export const useSessionsPerPlan = () => {
    const { sessions } = useContext(SessionsContext);
    const mapByPlan: ObjectMap<Session[]> = {};
    sessions
        .slice()
        .sort((a, b) => a.startDate.getTime() - b.startDate.getTime())
        .forEach((s) => {
            if (!mapByPlan[s.planId]) {
                mapByPlan[s.planId] = [];
            }
            mapByPlan[s.planId].push(s);
        });
    return mapByPlan;
};
