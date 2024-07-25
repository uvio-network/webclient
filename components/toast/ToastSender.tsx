import { ToastStore } from "@/components/toast/ToastStore";

export const Error = (text: string) => {
  ToastStore.getState().create({
    clss: "bg-red-500",
    titl: "Error",
    text: text,
    unix: Date.now(),
  });
};

export const Info = (text: string) => {
  ToastStore.getState().create({
    clss: "bg-yellow-300",
    titl: "Info",
    text: text,
    unix: Date.now(),
  });
};

export const Success = (text: string) => {
  ToastStore.getState().create({
    clss: "bg-green-500",
    titl: "Success",
    text: text,
    unix: Date.now(),
  });
};
