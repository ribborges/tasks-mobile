import { forwardRef } from 'react';
import { Svg } from 'react-native-svg';

import { IconProps } from './IconProps';

export const Icon = forwardRef<Svg, IconProps>(({
    color = '#000',
    size = '1em',
    title = null,
    className = '',
    children,
    ...rest
}, ref) => {
    return (
        <Svg
            ref={ref}
            viewBox="0 0 16 16"
            width={size}
            height={size}
            fill={color}
            className={className}
        >
            {children}
        </Svg>
    );
});