import { SvgProps } from "react-native-svg";

interface IconProps extends SvgProps {
    color?: string;
    size?: string | number;
    title?: string;
    className?: string;
}

export { IconProps };