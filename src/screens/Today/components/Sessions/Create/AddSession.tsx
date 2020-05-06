import React, { useContext, useEffect, useMemo } from 'react';
import { StyleSheet, ScrollView, View, Alert } from 'react-native';
import { NavigationScreenProp } from 'react-navigation';
import { useForm, Controller } from 'react-hook-form';
import Screen from 'components/Screen';
import Input from 'components/Input';
import Button from 'components/Button';
import Picker from 'components/Picker';
import colors from 'styles/colors';
import SessionsContext from 'modules/Sessions/context';
import { usePlansWithTasks } from 'modules/Plans/selectors';
import { CreateSessionDTO } from 'modules/Sessions/types';
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
        CreateSessionDTO
    >();
    const plansWithTasks = usePlansWithTasks();
    const plansForPicker = useMemo(
        () => plansWithTasks.map((p) => ({ label: p.task.name, value: p.id })),
        [plansWithTasks]
    );
    const { createSession } = useContext(SessionsContext);

    const suggestions = useMemo(() => {
        function getRandomNumber(max: number) {
            return Math.round(Math.random() * max);
        }
        return {
            plannedTime: targetTime[getRandomNumber(targetTime.length - 1)],
        };
    }, []);

    const onSubmit = async (plan: CreateSessionDTO) => {
        createSession({
            ...plan,
            startDate: new Date(),
        });
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
                            setValue('planId', value, true)
                        }
                        items={plansForPicker}
                        // @ts-ignore
                        ref={register({ name: 'planId' }, { required: true })}
                    />
                    <Input
                        placeholder={suggestions.plannedTime}
                        placeholderTextColor={colors.grey[2]}
                        style={styles.input}
                        label="Hours worked"
                        keyboardType="numeric"
                        ref={register(
                            { name: 'workingTime' },
                            { required: true }
                        )}
                        onChangeText={(text) =>
                            setValue('workingTime', Number(text), true)
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
