import { type PropsWithChildren } from "react";

import { AuthContext } from "@/context/auth";
import { useStorageState } from "@/hooks/useStorageState";

export function SessionProvider({ children }: PropsWithChildren) {
    const [[isLoading, session], setSession] = useStorageState('session');

    return (
        <AuthContext.Provider
            value={{
                signIn: () => {
                    setSession('xxx');
                },
                signOut: () => {
                    setSession(null);
                },
                session,
                isLoading
            }}>
            {children}
        </AuthContext.Provider>
    );
}