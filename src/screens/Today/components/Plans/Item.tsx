import React from 'react';
import { StyleSheet, TouchableOpacity, Text, View } from 'react-native';
import { PlanWithTask } from 'modules/Plans/types';
import { listStyles } from 'styles/listStyles';
import colors from 'styles/colors';

const PlanListItem: React.FC<PlanWithTask> = ({
    task: { name },
    plannedTime,
}) => {
    return (
        <TouchableOpacity style={styles.root}>
            <View style={styles.top}>
                <Text style={styles.name}>{name}</Text>
                <Text style={styles.targetTime}>{plannedTime}h</Text>
                <Text style={styles.name}>{name}</Text>
                <Text style={styles.targetTime}>
                    +{workingTime}h ({accumulatedTime} / {plannedTime})
                </Text>
            </View>
            <View style={styles.bar}>
                <View
                    style={[
                        styles.progress,
                        { width: `${(accumulatedTime / plannedTime) * 100}%` },
                        accumulatedTime === plannedTime && styles.completed,
                        accumulatedTime > plannedTime && styles.over,
                    ]}
                />
            </View>
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
