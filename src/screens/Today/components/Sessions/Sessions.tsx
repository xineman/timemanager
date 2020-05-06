import React from 'react';
import { FlatList, StyleSheet, Text } from 'react-native';
import { useSessionsWithPlans } from 'modules/Sessions/selectors';
import TaskListSeparator from 'screens/Tasks/List/components/Separator';
import SessionListItem from './Item';

const Sessions: React.FC = () => {
    const sessionsWithTasks = useSessionsWithPlans();

    return sessionsWithTasks.length ? (
        <FlatList
            style={styles.list}
            data={sessionsWithTasks}
            renderItem={({ item }) => <SessionListItem {...item} />}
            ItemSeparatorComponent={TaskListSeparator}
        />
    ) : (
        <Text style={styles.noTasks}>No sessions yet</Text>
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
