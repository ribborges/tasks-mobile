import { createContext } from "react";

const AuthContext = createContext<{
    signIn: (data: string) => void;
    signOut: () => void;
    session?: string | null;
    isLoading: boolean;
}>({
    signIn: (data: string) => null,
    signOut: () => null,
    session: null,
    isLoading: false,
});

export { AuthContext };