import React, { useContext, useEffect, useMemo } from 'react';
import { StyleSheet, ScrollView, View, Alert } from 'react-native';
import { NavigationScreenProp } from 'react-navigation';
import { useForm, Controller } from 'react-hook-form';
import Screen from 'components/Screen';
import Input from 'components/Input';
import Button from 'components/Button';
import Picker from 'components/Picker';
import { CreateTaskDTO } from 'modules/Tasks/types';
import TasksContext from 'modules/Tasks/context';
import { name, targetTime, sessionsNumber } from './suggestions';
import colors from 'styles/colors';


const sessionsNumberOptions = [
    { label: '1', value: 1 },
    { label: '2', value: 2 },
    { label: '3', value: 3 },
    { label: '4', value: 4 },
    { label: '5', value: 5 },
    { label: '6', value: 6 },
    { label: '7', value: 7 },
];

const sessionsNumberPlaceholder = { label: 'Please, choose...', value: undefined };

interface Props {
    navigation: NavigationScreenProp<any>;
}

const CreateTask: React.FC<Props> = ({ navigation }) => {
    const { register, setValue, handleSubmit, errors } = useForm<CreateTaskDTO>();
    const { createTask } = useContext(TasksContext);

    const suggestions = useMemo(() => {
        function getRandomNumber(max: number) {
            return Math.round(Math.random() * max);
        }
        return {
            name: name[getRandomNumber(name.length - 1)],
            targetTime: targetTime[getRandomNumber(targetTime.length - 1)],
            sessionsNumber: getRandomNumber(sessionsNumber.length - 1),
        };
    }, []);

    const onSubmit = async (task: CreateTaskDTO) => {
        createTask(task);
        navigation.goBack();
    };

    useEffect(() => {
        const isValid = !Object.keys(errors).length;
        if (!isValid) {
            Alert.alert('Fill all the fields');
        }
    }, [errors]);

    return (
        <Screen style={styles.root}>
            <ScrollView style={styles.scrollView} keyboardShouldPersistTaps="handled">
                <View style={styles.inputs}>
                    <Input
                        placeholder={suggestions.name}
                        placeholderTextColor={colors.grey[2]}
                        style={styles.input}
                        label="Name"
                        ref={register({ name: 'name' }, { required: true })}
                        onChangeText={text => setValue('name', text, true)}
                    />
                    <Input
                        placeholder={suggestions.targetTime}
                        placeholderTextColor={colors.grey[2]}
                        style={styles.input}
                        label="Hours per week"
                        keyboardType="numeric"
                        ref={register({ name: 'targetTime' }, { required: true })}
                        onChangeText={text => setValue('targetTime', Number(text), true)}
                    />
                    {/* TODO: fix default value */}
                    <Picker
                        style={styles.input}
                        label="Sessions per week"
                        placeholder={sessionsNumberPlaceholder}
                        placeholderTextColor={colors.grey[2]}
                        onValueChange={value => setValue('sessionsNumber', value, true)}
                        items={sessionsNumberOptions}
                        // @ts-ignore
                        ref={register({ name: 'sessionsNumber' }, { required: true })}
                    />
                </View>
                <Button label="Create" onPress={handleSubmit(onSubmit)} />
            </ScrollView>
        </Screen>
    );
}

const styles = StyleSheet.create({
    root: {
        flex: 1,
    },
    scrollView: {
        flex: 1,
    },
    inputs: {
        paddingVertical: 20,
        paddingHorizontal: 15,
    },
    input: {
        marginBottom: 15,
    },
});

export default CreateTask;
