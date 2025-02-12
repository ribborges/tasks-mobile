import React, { ReactNode, useState } from "react";

import ModalContext, { ToastContextProps, ToastProps } from "@/contexts/toast";
import Toast from "@/components/Toast";

export default function ToastProvider({ children }: { children: ReactNode }) {
    const [isOpen, setIsOpen] = useState(false);

    const [toastProps, setToastProps] = useState<ToastProps>({
        message: "Toast",
        type: 'info'
    });

    const toastContextProps: ToastContextProps = {
        show: (props: ToastProps) => {
            setToastProps(props);
            setIsOpen(true);
        },
        hide: () => {
            setIsOpen(false);
        }
    }

    return (
        <ModalContext.Provider value={toastContextProps}>
            <Toast message={toastProps.message || ""} type={toastProps.type} visible={isOpen} closeBtn={() => setIsOpen(false)} />
            {children}
        </ModalContext.Provider>
    );
}