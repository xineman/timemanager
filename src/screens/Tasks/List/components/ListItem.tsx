import React from 'react';
import { View, StyleSheet, Text } from 'react-native';
import { Task } from 'modules/Tasks/types';
import colors from 'styles/colors';
import { listStyles } from 'styles/listStyles';


const TaskListItem: React.FC<Task> = ({ name, targetTime, sessionsNumber }) => (
    <View style={styles.root}>
        <Text style={styles.name}>{name}</Text>
        <View style={styles.rightBlock}>
            <Text style={styles.targetTime}>{targetTime}h</Text>
            <Text style={styles.sessionsNumber}>{sessionsNumber}</Text>
        </View>
    </View>
);

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
    rightBlock: {
        
    },
    targetTime: {
        marginBottom: 5,
        fontSize: 14,
    },
    sessionsNumber: {
        fontSize: 14,
    },
});

export default TaskListItem;
