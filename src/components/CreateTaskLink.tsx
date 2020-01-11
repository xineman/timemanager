import React, { useCallback } from 'react';
import { TouchableOpacity, StyleSheet } from 'react-native';
import { FontAwesomeIcon } from '@fortawesome/react-native-fontawesome';
import { NavigationScreenProp } from 'react-navigation';


interface Props {
    tintColor?: string;
    navigation: NavigationScreenProp<any>
}

const CreateTaskLink: React.FC<Props> = ({ tintColor, navigation }) => {
    const onPress = useCallback(() => { navigation.navigate('CreateTask') }, []);

    return (
        <TouchableOpacity style={styles.root} onPress={onPress}>
            <FontAwesomeIcon icon="plus" color={tintColor} />
        </TouchableOpacity>
    );
}

const styles = StyleSheet.create({
    root: {
        padding: 15,
    },
});

export default CreateTaskLink;
