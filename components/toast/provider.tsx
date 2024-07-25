import * as React from "react";
import * as RadixToast from "@radix-ui/react-toast";
import * as Toast from "@/components/toast/store";

import { XMarkIcon } from "@/components/icon/XMarkIcon";

export const Provider = () => {
  const { toasts } = Toast.useStore();

  return (
    <RadixToast.Provider duration={10 * 1000} swipeDirection="right">
      {toasts.map((mes: Toast.Message) => {
        return (
          <RadixToast.Root
            key={mes.unix}
            className={`
              p-4 text-black rounded-md items-center
              data-[state=open]:animate-slideIn data-[state=closed]:animate-hide data-[swipe=move]:translate-x-[var(--radix-toast-swipe-move-x)] data-[swipe=cancel]:translate-x-0 data-[swipe=cancel]:transition-[transform_200ms_ease-out] data-[swipe=end]:animate-swipeOut
              ${mes.clss}
            `}
            onOpenChange={(open: boolean) => {
              if (open === false) {
                Toast.useStore.getState().delete(mes);
              }
            }}
          >
            <div className="flex">
              <RadixToast.Title className="grow font-medium">{mes.titl}</RadixToast.Title>
              <RadixToast.Close className="flex-none" aria-label="Close">
                <div className="h-fit items-center rounded-md hover:bg-black outline-none group">
                  <XMarkIcon
                    className="w-5 h-5 text-black group-hover:text-white dark:text-black dark:group-hover:text-white"
                    overwrite={true}
                  />
                </div>
              </RadixToast.Close>
            </div>
            <RadixToast.Description>{mes.text}</RadixToast.Description>
          </RadixToast.Root>
        );
      })}

      <RadixToast.Viewport className="[--viewport-padding:_25px] fixed bottom-0 right-0 flex flex-col p-[var(--viewport-padding)] gap-[10px] w-[390px] max-w-[100vw] m-0 list-none z-[2147483647] outline-none" />

    </RadixToast.Provider >
  );
};
