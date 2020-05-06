import React from 'react';
import { createAppContainer } from 'react-navigation';
import { createBottomTabNavigator } from 'react-navigation-tabs';
import { createStackNavigator } from 'react-navigation-stack';
import Today from 'screens/Today';
import TaskList from 'screens/Tasks/List';
import CreateTask from 'screens/Tasks/Create';
import AddPlan from 'screens/Today/components/Plans/Create';
import AddSession from 'screens/Today/components/Sessions/Create';
import TabBarIcon from 'components/TabBarIcon';
import AddLink from 'components/AddLink';

const TasksNavigator = createStackNavigator(
    {
        Tasks: {
            screen: TaskList,
            navigationOptions({ navigation }) {
                return {
                    headerRight: ({ tintColor }) => (
                        <AddLink
                            tintColor={tintColor}
                            navigation={navigation}
                            route="CreateTask"
                        />
                    ),
                };
            },
        },
        CreateTask,
    },
    {
        mode: 'modal',
    }
);

const TodayNavigator = createStackNavigator(
    {
        Today: {
            screen: Today,
            navigationOptions({ navigation }) {
                const route =
                    navigation.getParam('tab') === 'sessions'
                        ? 'AddSession'
                        : 'AddPlan';
                return {
                    headerRight: ({ tintColor }) => (
                        <AddLink
                            tintColor={tintColor}
                            navigation={navigation}
                            route={route}
                        />
                    ),
                };
            },
        },
        AddPlan,
        AddSession,
    },
    {
        mode: 'modal',
    }
);

const TabNavigator = createBottomTabNavigator({
    Today: {
        screen: TodayNavigator,
        navigationOptions: {
            tabBarIcon: ({ tintColor }) => (
                <TabBarIcon icon="calendar-check" tintColor={tintColor} />
            ),
        },
    },
    Tasks: {
        screen: TasksNavigator,
        navigationOptions: {
            tabBarIcon: ({ tintColor }) => (
                <TabBarIcon icon="list-ul" tintColor={tintColor} />
            ),
        },
    },
});

export default createAppContainer(TabNavigator);
