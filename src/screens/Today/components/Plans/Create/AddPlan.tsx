import React, { useContext, useEffect, useMemo } from 'react';
import { StyleSheet, ScrollView, View, Alert } from 'react-native';
import { NavigationScreenProp } from 'react-navigation';
import { useForm, Controller } from 'react-hook-form';
import Screen from 'components/Screen';
import Input from 'components/Input';
import Button from 'components/Button';
import Picker from 'components/Picker';
import { CreatePlanDTO } from 'modules/Plans/types';
import TasksContext from 'modules/Tasks/context';
import PlansContext from 'modules/Plans/context';
import colors from 'styles/colors';
import { name, sessionsNumber, targetTime } from './suggestions';

const sessionsNumberPlaceholder = {
    label: 'Please, choose...',
    value: undefined,
};

interface Props {
    navigation: NavigationScreenProp<any>;
}

const CreateTask: React.FC<Props> = ({ navigation }) => {
    const { register, setValue, handleSubmit, errors } = useForm<
        CreatePlanDTO
    >();
    const { tasks } = useContext(TasksContext);
    const tasksForPicker = useMemo(
        () => tasks.map((t) => ({ label: t.name, value: t.id })),
        [tasks]
    );
    const { createPlan } = useContext(PlansContext);

    const suggestions = useMemo(() => {
        function getRandomNumber(max: number) {
            return Math.round(Math.random() * max);
        }
        return {
            plannedTime: targetTime[getRandomNumber(targetTime.length - 1)],
        };
    }, []);

    const onSubmit = async (plan: CreatePlanDTO) => {
        createPlan(plan);
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
            <ScrollView
                style={styles.scrollView}
                keyboardShouldPersistTaps="handled"
            >
                <View style={styles.inputs}>
                    {/* TODO: fix default value */}
                    <Picker
                        style={styles.input}
                        label="Task"
                        placeholder={sessionsNumberPlaceholder}
                        placeholderTextColor={colors.grey[2]}
                        onValueChange={(value) =>
                            setValue('taskId', value, true)
                        }
                        items={tasksForPicker}
                        // @ts-ignore
                        ref={register({ name: 'taskId' }, { required: true })}
                    />
                    <Input
                        placeholder={suggestions.plannedTime}
                        placeholderTextColor={colors.grey[2]}
                        style={styles.input}
                        label="Hours per week"
                        keyboardType="numeric"
                        ref={register(
                            { name: 'plannedTime' },
                            { required: true }
                        )}
                        onChangeText={(text) =>
                            setValue('plannedTime', Number(text), true)
                        }
                    />
                </View>
                <Button label="Add" onPress={handleSubmit(onSubmit)} />
            </ScrollView>
        </Screen>
    );
};

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
