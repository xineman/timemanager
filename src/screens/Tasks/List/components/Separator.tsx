import React from 'react';
import { View, StyleSheet } from 'react-native';


const TaskListSeparator: React.FC = () => (
    <View style={styles.root} />
);

const styles = StyleSheet.create({
    root: {
        height: 10,
    },
});

export default TaskListSeparator;
