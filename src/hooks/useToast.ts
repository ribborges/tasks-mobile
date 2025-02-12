import { useContext } from "react";
import ToastContext from "@/contexts/toast";

const useToast = () => useContext(ToastContext);

export default useToast;