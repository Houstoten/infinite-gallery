import toast from "react-hot-toast";

export const warningToast = (text: string) => toast(text, { icon: "⚠️" })