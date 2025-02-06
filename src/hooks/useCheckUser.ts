import { useEffect, useState } from "react";

import { useUserStore } from "@/lib/store";
import { getLoggedUser } from "@/services/user.service";

export default function useCheckUser() {
    const [userLoading, setUserLoading] = useState(true);
    const { user, setToken, setUser } = useUserStore();

    useEffect(() => {
        const loadUser = async () => {
            await getLoggedUser()
                .then((res) => {
                    const { token, ...user } = res?.data;
                    setToken(token);
                    setUser(user);
                })
                .catch((error) => {
                    console.error(error);
                });
        };

        if (user === undefined) {
            loadUser();
        }

        setUserLoading(false);
    }, []);

    return { userLoading };
}