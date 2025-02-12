import { createContext } from "react";

export interface ToastProps {
    message?: string,
    type?: 'success' | 'error' | 'warning' | 'info',
}

export interface ToastContextProps {
    show: (props: ToastProps) => void,
    hide: () => void
}

export const defaultValue: ToastContextProps = {
    show: () => {
        throw new Error('show function is not implemented');
    },
    hide: () => {
        throw new Error('hide function is not implemented');
    }
}

const ToastContext = createContext(defaultValue);

export default ToastContext;