import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import RNPickerSelect, { PickerProps } from 'react-native-picker-select';
import colors from 'styles/colors';


interface Props extends PickerProps {
    label: string;
}

const Picker: React.FC<Props> = ({ label, style, ...props }) => {
    return (
        <View style={style}>
            {label && <Text style={styles.label}>{label}</Text>}
            <RNPickerSelect
                style={{ inputIOS: styles.input }}
                {...props}
            />
        </View>
    );
};

const styles = StyleSheet.create({
    label: {
        marginBottom: 5,
        fontSize: 14,
        color: colors.grey[1],
    },
    input: {
        borderBottomWidth: 1,
        borderColor: colors.blue[2],
        height: 50,
        paddingHorizontal: 10,
        color: colors.grey[1],
    },
});

export default Picker;
