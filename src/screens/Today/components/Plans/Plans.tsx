import React from 'react';
import { FlatList, StyleSheet, Text } from 'react-native';
import { usePlansWithTasks } from 'modules/Plans/selectors';
import PlanListItem from './Item';

const Sessions: React.FC = () => {
    const plansWithTasks = usePlansWithTasks();

    return plansWithTasks.length ? (
        <FlatList
            style={styles.list}
            data={plansWithTasks}
            renderItem={({ item }) => <PlanListItem {...item} />}
        />
    ) : (
        <Text style={styles.noTasks}>No plans yet</Text>
    );
};

const styles = StyleSheet.create({
    root: {
        flex: 1,
        justifyContent: 'center',
    },
    list: {
        flex: 1,
        paddingHorizontal: 10,
        paddingVertical: 10,
    },
    noTasks: {
        paddingVertical: 10,
        textAlign: 'center',
    },
});

export default Sessions;
