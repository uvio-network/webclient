import { ToastStore } from "@/components/toast/ToastStore";

export const Error = (text: string, repl: boolean = false): false => {
  ToastStore.getState().create({
    clss: "bg-rose-400",
    repl: repl,
    spin: false,
    titl: "Error",
    text: text,
    unix: Date.now(),
  });

  return false;
};

export const Info = (text: string, repl: boolean = false) => {
  ToastStore.getState().create({
    clss: "bg-amber-300",
    repl: repl,
    spin: false,
    titl: "Info",
    text: text,
    unix: Date.now(),
  });
};

export const Processing = (text: string) => {
  ToastStore.getState().create({
    clss: "bg-sky-300",
    repl: false,
    spin: true,
    titl: "Processing",
    text: text,
    unix: Date.now(),
  });
};

export const Success = (text: string, repl: boolean = false) => {
  ToastStore.getState().create({
    clss: "bg-emerald-400",
    repl: repl,
    spin: false,
    titl: "Success",
    text: text,
    unix: Date.now(),
  });
};
