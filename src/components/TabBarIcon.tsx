import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-native-fontawesome';


interface Props {
    tintColor?: string;
    icon: string;
}

const TabBarIcon: React.FC<Props> = ({ tintColor, icon}) => (
    <FontAwesomeIcon icon={icon} color={tintColor} />
);

export default TabBarIcon;
