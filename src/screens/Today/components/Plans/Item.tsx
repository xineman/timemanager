import React from 'react';
import { StyleSheet, TouchableOpacity, Text } from 'react-native';
import { PlanWithTask } from 'modules/Plans/types';
import { listStyles } from 'styles/listStyles';
import colors from 'styles/colors';

const PlanListItem: React.FC<PlanWithTask> = ({
    task: { name },
    plannedTime,
}) => {
    return (
        <TouchableOpacity style={styles.root}>
            <Text style={styles.name}>{name}</Text>
            <Text style={styles.targetTime}>{plannedTime}h</Text>
        </TouchableOpacity>
    );
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
    targetTime: {
        marginBottom: 5,
        fontSize: 14,
    },
});

export default PlanListItem;
