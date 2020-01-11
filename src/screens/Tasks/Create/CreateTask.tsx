import React, { useContext, useEffect } from 'react';
import { StyleSheet, ScrollView, View, Alert } from 'react-native';
import { useForm } from 'react-hook-form';
import Screen from 'components/Screen';
import Input from 'components/Input';
import Button from 'components/Button';
import Picker from 'components/Picker';
import { CreateTaskDTO } from 'modules/Tasks/types';
import { NavigationScreenProp } from 'react-navigation';
import TasksContext from 'modules/Tasks/context';


const placeholder = { label: 'Please, choose...', value: null };

interface Props {
    navigation: NavigationScreenProp<any>;
}

const CreateTask: React.FC<Props> = ({ navigation }) => {
    const { register, setValue, handleSubmit, errors } = useForm<CreateTaskDTO>();
    const { createTask } = useContext(TasksContext);
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
                        style={styles.input}
                        label="Name"
                        ref={register({ name: 'name' }, { required: true })}
                        onChangeText={text => setValue('name', text, true)}
                    />
                    <Input
                        style={styles.input}
                        label="Hours per week"
                        keyboardType="numeric"
                        ref={register({ name: 'targetTime' }, { required: true })}
                        onChangeText={text => setValue('targetTime', Number(text), true)}
                    />
                    <Picker
                        style={styles.input}
                        label="Sessions per week"
                        placeholder={placeholder}
                        // @ts-ignore
                        ref={register({ name: 'sessionsNumber' }, { required: true })}
                        onValueChange={value => setValue('sessionsNumber', value, true)}
                        items={[
                            { label: '1', value: 1 },
                            { label: '2', value: 2 },
                            { label: '3', value: 3 },
                            { label: '4', value: 4 },
                            { label: '5', value: 5 },
                            { label: '6', value: 6 },
                            { label: '7', value: 7 },
                        ]}
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
