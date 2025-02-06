import { create } from 'zustand';

import { UserSchema } from '@/types/user';
import { LoginData, RegisterData } from '@/interfaces/auth';
import { getLoginStatus, loginUser, logoutUser, registerUser } from '@/services/auth.service';
import { getLoggedUser } from '@/services/user.service';

type State = {
    user?: UserSchema;
    token?: string;
}

type Actions = {
    setUser: (user: UserSchema) => void;
    setToken: (token: string) => void;
    logout: () => void;
}

const useUserStore = create<State & Actions>((set) => ({
    user: undefined,
    token: undefined,
    setUser: (user: UserSchema) => {
        set({ user });
    },
    setToken: (token: string) => {
        set({ token });
    },
    logout: () => {
        set({ user: undefined, token: undefined });
    }
}));

export default useUserStore;