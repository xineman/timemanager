import React from 'react';
import { TouchableOpacity, StyleSheet, Text, TouchableOpacityProps } from 'react-native';
import colors from 'styles/colors';


interface Props extends TouchableOpacityProps {
    label: string;
}

const Button: React.FC<Props> = ({ label, style, ...props }) => {
    return (
        <TouchableOpacity style={[styles.button, style]} {...props}>
            <Text style={styles.label}>{label}</Text>
        </TouchableOpacity>
    );
};

const styles = StyleSheet.create({
    button: {
        backgroundColor: colors.blue[0],
        height: 50,
        justifyContent: 'center',
    },
    label: {
        textAlign: 'center',
        fontSize: 14,
        color: colors.white,
    },
});

export default Button;
