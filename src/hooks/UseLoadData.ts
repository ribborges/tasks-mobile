import { useCallback, useEffect, useState } from "react";

import { useCategoryStore, useTaskStore, useUserStore } from "@/lib/store";
import { GetCategories } from "@/services/category.service";
import { GetTasks } from "@/services/task.service";

export default function useLoadData() {
    const [dataLoading, setDataLoading] = useState(true);
    const { user } = useUserStore();
    const { setCategories } = useCategoryStore();
    const { setTasks } = useTaskStore();

    const loadData = useCallback(async () => {
        if (user) {
            await GetCategories(user?.id).then((res) => {
                const data = res?.data;

                if (Array.isArray(data)) {
                    setCategories(data);
                } else {
                    setCategories([]);
                }
            }).catch((error) => {
                console.error("Error fetching categories:", error);
                setCategories([]);
            });

            await GetTasks(user?.id).then((res) => {
                const data = res?.data;

                if (Array.isArray(data)) {
                    setTasks(data);
                } else {
                    setTasks([]);
                }
            }).catch((error) => {
                console.error("Error fetching tasks:", error);
                setTasks([]);
            });

            setDataLoading(false);
        }
    }, [user, GetTasks, GetCategories, setTasks, setCategories]);

    useEffect(() => {
        loadData();
    }, [user]);

    return { dataLoading };
}