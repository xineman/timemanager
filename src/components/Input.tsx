import React from 'react';
import { TextInput, StyleSheet, TextInputProps, View, Text } from 'react-native';
import colors from 'styles/colors';


interface Props extends TextInputProps {
    label?: string;
    ref?: any;
}

const Input: React.FC<Props> = React.forwardRef<TextInput, Props>(({ label, style, ...props }, ref) => (
    <View style={style}>
        {label && <Text style={styles.label}>{label}</Text>}
        <TextInput ref={ref} style={styles.input} {...props} />
    </View>
));

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
        color: colors.grey[1],
    },
});

export default Input;
