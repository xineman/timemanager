import React from 'react';
import { createAppContainer } from 'react-navigation';
import { createBottomTabNavigator } from 'react-navigation-tabs';
import { createStackNavigator } from 'react-navigation-stack';
import Today from 'screens/Today';
import TaskList from 'screens/Tasks/List';
import CreateTask from 'screens/Tasks/Create';
import TabBarIcon from 'components/TabBarIcon';
import CreateTaskLink from 'components/CreateTaskLink';


const TasksNavigator = createStackNavigator({
  Tasks: {
    screen: TaskList,
    navigationOptions({ navigation }) {
      return {
        headerRight: ({ tintColor }) => <CreateTaskLink tintColor={tintColor} navigation={navigation} />,
      };
    }
  },
  CreateTask,
}, {
  mode: 'modal',
});

const TabNavigator = createBottomTabNavigator({
  Today: {
    screen: Today,
    navigationOptions: {
      tabBarIcon: ({ tintColor }) => <TabBarIcon icon="calendar-check" tintColor={tintColor} />,
    },
  },
  Tasks: {
    screen: TasksNavigator,
    navigationOptions: {
      tabBarIcon: ({ tintColor }) => <TabBarIcon icon="list-ul" tintColor={tintColor} />,
    },
  },
});

export default createAppContainer(TabNavigator);
