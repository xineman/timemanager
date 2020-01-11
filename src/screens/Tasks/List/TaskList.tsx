import React, { useContext } from 'react';
import { Text, FlatList, StyleSheet, View } from 'react-native';
import Screen from 'components/Screen';
import { Task } from 'modules/Tasks/types';
import TaskListItem from './components/ListItem';
import TaskListSeparator from './components/Separator';
import { listStyles } from 'styles/listStyles';
import colors from 'styles/colors';
import TasksContext from 'modules/Tasks/context';


interface Category {
    id: number;
    name: string;
}

const categoriesMock: Category[] = [
    { id: 1, name: 'Photography' },
    { id: 2, name: 'Work' },
];

const taskListMock: Task[] = [
    { id: '1', name: 'Photo editing', targetTime: 6, category: 1 },
    { id: '2', name: 'Reading the theory', targetTime: 3, category: 1 },
    { id: '3', name: 'Dennis', targetTime: 3, category: 2 },
    { id: '4', name: 'Roma', targetTime: 3, category: 2 },
];

const TaskList = () => {
    const { tasks } = useContext(TasksContext);

    return (
        <Screen style={styles.root}>
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
        </Screen>
    );
}

const styles = StyleSheet.create({
    root: {
        flex: 1,
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
});

export default TaskList;
