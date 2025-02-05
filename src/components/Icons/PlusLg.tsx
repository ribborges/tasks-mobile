import { Path } from 'react-native-svg';

import { IconProps } from './IconProps';
import { Icon } from './BaseIcon';

export function PlusLg(props: IconProps) {
    return (
        <Icon {...props}>
            <Path fill-rule="evenodd" d="M8 2a.5.5 0 0 1 .5.5v5h5a.5.5 0 0 1 0 1h-5v5a.5.5 0 0 1-1 0v-5h-5a.5.5 0 0 1 0-1h5v-5A.5.5 0 0 1 8 2" />
        </Icon>
    );
};