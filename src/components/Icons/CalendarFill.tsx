import { Path } from 'react-native-svg';

import { IconProps } from './IconProps';
import { Icon } from './BaseIcon';

export function CalendarFill(props: IconProps) {
    return (
        <Icon {...props}>
            <Path d="M3.5 0a.5.5 0 0 1 .5.5V1h8V.5a.5.5 0 0 1 1 0V1h1a2 2 0 0 1 2 2v11a2 2 0 0 1-2 2H2a2 2 0 0 1-2-2V5h16V4H0V3a2 2 0 0 1 2-2h1V.5a.5.5 0 0 1 .5-.5" />
        </Icon>
    );
};