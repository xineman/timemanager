/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * Generated with the TypeScript template
 * https://github.com/react-native-community/react-native-template-typescript
 *
 * @format
 */

import React from 'react';
import {
  StyleSheet,
  StatusBar,
} from 'react-native';
import Navigator from './routes';
import { TasksProvider } from 'modules/Tasks/context';
import './icons';

const App = () => {
  return (
    <TasksProvider>
      <StatusBar barStyle="dark-content" />
      <Navigator />
    </TasksProvider>
  );
};

const styles = StyleSheet.create({
});

export default App;
