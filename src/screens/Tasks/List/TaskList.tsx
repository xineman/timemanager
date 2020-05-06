import React, { useContext } from 'react';
import { Text, FlatList, StyleSheet, View } from 'react-native';
import Screen from 'components/Screen';
import { listStyles } from 'styles/listStyles';
import colors from 'styles/colors';
import TasksContext from 'modules/Tasks/context';
import TaskListItem from './components/ListItem';
import TaskListSeparator from './components/Separator';

interface Category {
    id: number;
    name: string;
}

const categoriesMock: Category[] = [
    { id: 1, name: 'Photography' },
    { id: 2, name: 'Work' },
];

const TaskList = () => {
    const { tasks } = useContext(TasksContext);

    return (
        <Screen style={styles.root}>
            {tasks.length ? (
                <>
                    <View style={styles.header}>
                        <Text style={styles.headerText}>Task</Text>
                        <Text style={styles.headerText}>Goal</Text>
                    </View>

                    <FlatList
                        style={styles.list}
                        data={tasks}
                        keyExtractor={({ id }) => id.toString()}
                        renderItem={({ item }) => <TaskListItem {...item} />}
                        ItemSeparatorComponent={TaskListSeparator}
                    />
                </>
            ) : (
                <Text style={styles.noTasks}>No tasks yet</Text>
            )}
        </Screen>
    );
};

const styles = StyleSheet.create({
    root: {
        flex: 1,
        justifyContent: 'center',
    },
    header: {
        ...listStyles.row,
        paddingHorizontal: 20,
    },
    headerText: {
        color: colors.grey[1],
    },
    list: {
        flex: 1,
        paddingHorizontal: 10,
    },
    noTasks: {
        textAlign: 'center',
    },
});

export default TaskList;
