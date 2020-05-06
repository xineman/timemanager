import React from 'react';
import { StyleSheet, TouchableOpacity, Text, View } from 'react-native';
import colors from 'styles/colors';
import { SessionWithPlan } from 'modules/Sessions/types';

const SessionListItem: React.FC<SessionWithPlan> = ({
    plan: {
        task: { name },
        plannedTime,
    },
    workingTime,
}) => {
    return (
        <TouchableOpacity style={styles.root}>
            <View style={styles.top}>
                <Text style={styles.name}>{name}</Text>
                <Text style={styles.targetTime}>{workingTime}h</Text>
            </View>
            <View style={styles.bar}>
                <View
                    style={[
                        styles.progress,
                        { width: `${(workingTime / plannedTime) * 100}%` },
                    ]}
                />
            </View>
        </TouchableOpacity>
    );
};

const styles = StyleSheet.create({
    root: {
        backgroundColor: colors.white,
        borderWidth: 1,
        borderColor: colors.grey[0],
        borderRadius: 5,
    },
    top: {
        padding: 10,
        flex: 1,
        flexDirection: 'row',
        justifyContent: 'space-between',
    },
    name: {
        fontSize: 16,
    },
    targetTime: {
        fontSize: 14,
    },
    bar: {
        height: 4,
        width: '100%',
        backgroundColor: 'grey',
    },
    progress: {
        height: 4,
        position: 'absolute',
        left: 0,
        top: 0,
        backgroundColor: 'orange',
    },
});

export default SessionListItem;
