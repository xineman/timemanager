import React from 'react';
import { SafeAreaView, StyleProp, ViewStyle } from 'react-native';


interface Props {
    style?: StyleProp<ViewStyle>
}

const Screen: React.FC<Props> = ({ children, style }) => (
    <SafeAreaView style={style}>
        {children}
    </SafeAreaView>
);

export default Screen;
