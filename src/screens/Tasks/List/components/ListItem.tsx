import React, { useContext, useCallback } from 'react';
import { View, StyleSheet, Text, TouchableOpacity } from 'react-native';
import { Task } from 'modules/Tasks/types';
import colors from 'styles/colors';
import { listStyles } from 'styles/listStyles';
import TasksContext from 'modules/Tasks/context';

const TaskListItem: React.FC<Task> = ({
    id,
    name,
    targetTime,
    sessionsNumber,
}) => {
    const { removeTask } = useContext(TasksContext);

    const hanlePress = useCallback(() => {
        removeTask(id);
    }, [id]);

    return (
        <TouchableOpacity style={styles.root} onPress={hanlePress}>
            <Text style={styles.name}>{name}</Text>
            <View style={styles.rightBlock}>
                <Text style={styles.targetTime}>{targetTime}h</Text>
                <Text style={styles.sessionsNumber}>{sessionsNumber}</Text>
            </View>
        </TouchableOpacity>
    );
};

TaskListItem.defaultProps = {
    sessionsNumber: 7,
};

const styles = StyleSheet.create({
    root: {
        ...listStyles.row,
        backgroundColor: colors.white,
        borderWidth: 1,
        borderColor: colors.grey[0],
        borderRadius: 5,
    },
    name: {
        fontSize: 16,
    },
    rightBlock: {},
    targetTime: {
        marginBottom: 5,
        fontSize: 14,
    },
    sessionsNumber: {
        fontSize: 14,
    },
});

export default TaskListItem;
