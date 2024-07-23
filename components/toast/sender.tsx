import * as Toast from "@/components/toast/store";

export const Error = (text: string) => {
  Toast.useStore.getState().addToast({
    clss: "bg-red-500",
    titl: "Error",
    text: text,
    unix: Date.now(),
  });
};

export const Info = (text: string) => {
  Toast.useStore.getState().addToast({
    clss: "bg-yellow-300",
    titl: "Info",
    text: text,
    unix: Date.now(),
  });
};

export const Success = (text: string) => {
  Toast.useStore.getState().addToast({
    clss: "bg-green-500",
    titl: "Success",
    text: text,
    unix: Date.now(),
  });
};
