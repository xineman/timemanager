import React, { useCallback } from 'react';
import { TouchableOpacity, StyleSheet } from 'react-native';
import { FontAwesomeIcon } from '@fortawesome/react-native-fontawesome';
import { NavigationScreenProp } from 'react-navigation';

interface Props {
    tintColor?: string;
    navigation: NavigationScreenProp<any>;
    route: string;
}

const AddLink: React.FC<Props> = ({ tintColor, navigation, route }) => {
    const onPress = useCallback(() => {
        navigation.navigate(route);
    }, [navigation, route]);

    return (
        <TouchableOpacity style={styles.root} onPress={onPress}>
            <FontAwesomeIcon icon="plus" color={tintColor} size={20} />
        </TouchableOpacity>
    );
};

const styles = StyleSheet.create({
    root: {
        padding: 15,
    },
});

export default AddLink;
