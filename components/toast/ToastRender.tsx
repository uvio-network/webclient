import * as React from "react";

import * as Toast from "@radix-ui/react-toast";

import { XMarkIcon } from "@/components/icon/base/XMarkIcon";
import { ToastButton } from "@/components/button/ToastButton";
import { ToastMessage, useToastStore } from "@/components/store/ToastStore";

export const ToastRender = () => {
  const { toasts } = useToastStore();

  return (
    <>
      {toasts.map((obj: ToastMessage, ind: number) => {
        return (
          <Toast.Root
            key={ind}
            className={`
              p-4 text-black rounded-md items-center
              data-[state=open]:animate-slideIn data-[state=closed]:animate-hide data-[swipe=move]:translate-x-[var(--radix-toast-swipe-move-x)] data-[swipe=cancel]:translate-x-0 data-[swipe=cancel]:transition-[transform_200ms_ease-out] data-[swipe=end]:animate-swipeOut
              ${obj.clss}
            `}
          // onOpenChange={(open: boolean) => {
          //   if (open === false) {
          //     this.state.dict.delete(key);
          //   }
          // }}
          >
            <div className="flex">
              <Toast.Title className="grow font-medium">{obj.titl}</Toast.Title>
              <Toast.Close className="flex-none" aria-label="Close">
                <ToastButton>
                  <XMarkIcon
                    className="w-5 h-5 text-black group-hover:text-white dark:text-black dark:group-hover:text-white"
                    overwrite={true}
                  />
                </ToastButton>
              </Toast.Close>
            </div>
            <Toast.Description>{obj.text}</Toast.Description>
          </Toast.Root>
        );
      })}
    </>
  );
};
