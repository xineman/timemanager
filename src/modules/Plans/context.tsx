import React, { useState, useCallback, useEffect } from 'react';
import { addItem, getItems, removeItem } from 'services/storage';
import { PlansContextProps, Plan, CreatePlanDTO } from './types';

const PlansContext = React.createContext<PlansContextProps>({
    plans: [],
    createPlan() {},
    removePlan() {},
});

export const PlansProvider: React.FC = ({ children }) => {
    const [plans, setPlans] = useState<Plan[]>([]);

    useEffect(() => {
        getItems<Plan>('plans').then((t) => setPlans(t));
    }, []);

    const createPlan = useCallback(async (task: Plan) => {
        const newTask = await addItem<CreatePlanDTO>('plans', task);
        setPlans((t) => [...t, newTask]);
    }, []);

    const removePlan = useCallback(async (id: string) => {
        await removeItem('plans', id);
        getItems<Plan>('plans').then((t) => setPlans(t));
    }, []);

    return (
        <PlansContext.Provider value={{ plans, createPlan, removePlan }}>
            {children}
        </PlansContext.Provider>
    );
};

export default PlansContext;
