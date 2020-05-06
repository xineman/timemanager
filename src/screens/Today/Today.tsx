import React, { useState, useCallback } from 'react';
import { Dimensions, StyleSheet } from 'react-native';
import { TabView, SceneMap, Route } from 'react-native-tab-view';
import Screen from 'components/Screen';
import { Task } from 'modules/Tasks/types';
import Sessions from './components/Sessions';
import Plans from './components/Plans';
import { NavigationScreenProp } from 'react-navigation';

interface Day {
    start: number; // wake up time, hours
    end: number; // go to sleep time, hours. Think of what to do if working day ends after midnight
    items: DayItem[];
}

interface DayItem {
    task: Task;
    sessions: Session[];
}

interface Session {}

const initialLayout = { width: Dimensions.get('window').width };

const routes: Route[] = [
    { key: 'sessions', title: 'Sessions' },
    { key: 'plan', title: 'Plan' },
];

interface Props {
    navigation: NavigationScreenProp<any>;
}
const Today: React.FC<Props> = ({ navigation }) => {
    const [index, setActiveTab] = useState(0);

    const handleIndexChange = useCallback(
        (newIndex) => {
            setActiveTab(newIndex);
            navigation.setParams({
                tab: newIndex === 0 ? 'sessions' : 'plans',
            });
        },
        [navigation]
    );

    const renderScene = SceneMap({
        sessions: Sessions,
        plan: Plans,
    });

    return (
        <Screen style={styles.root}>
            <TabView
                style={styles.root}
                navigationState={{ index, routes }}
                renderScene={renderScene}
                onIndexChange={handleIndexChange}
                initialLayout={initialLayout}
            />
        </Screen>
    );
};

const styles = StyleSheet.create({
    root: {
        flex: 1,
    },
});

export default Today;
