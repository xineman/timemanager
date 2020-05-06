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
import { StyleSheet, StatusBar } from 'react-native';
import { TasksProvider } from 'modules/Tasks/context';
import { PlansProvider } from 'modules/Plans/context';
import { SessionsProvider } from 'modules/Sessions/context';
import Navigator from './routes';
import './icons';

const App = () => {
    return (
        <TasksProvider>
            <PlansProvider>
                <SessionsProvider>
                    <StatusBar barStyle="dark-content" />
                    <Navigator />
                </SessionsProvider>
            </PlansProvider>
        </TasksProvider>
    );
};

const styles = StyleSheet.create({});

export default App;
