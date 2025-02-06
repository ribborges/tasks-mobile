import { type PropsWithChildren } from "react";

import { AuthContext } from "@/context/auth";
import { useStorageState } from "@/hooks/useStorageState";

export function SessionProvider({ children }: PropsWithChildren) {
    const [[isLoading, session], setSession] = useStorageState('session');

    return (
        <AuthContext.Provider
            value={{
                signIn: async (token) => {
                    if (!token) {
                        return;
                    }

                    setSession(token);
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