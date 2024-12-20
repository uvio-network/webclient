import * as RadixToast from "@radix-ui/react-toast";

import { BaseButton } from "@/components/button/BaseButton";
import { ToastMessage } from "@/components/toast/ToastStore";
import { ToastStore } from "@/components/toast/ToastStore";
import { XMarkIcon } from "@/components/icon/XMarkIcon";

export const ToastProvider = () => {
  const { toasts } = ToastStore();

  return (
    <RadixToast.Provider
      duration={10 * 1000}
      swipeDirection="right"
    >
      {toasts.map((mes: ToastMessage) => {
        return (
          <RadixToast.Root
            key={mes.unix}
            className={`
              relative p-2 text-black rounded items-center
              data-[state=open]:animate-slideIn
              data-[state=closed]:animate-hide
              data-[swipe=move]:translate-x-[var(--radix-toast-swipe-move-x)]
              data-[swipe=cancel]:translate-x-0
              data-[swipe=cancel]:transition-[transform_200ms_ease-out]
              data-[swipe=end]:animate-swipeOut
              ${mes.clss}
            `}
            onOpenChange={(open: boolean) => {
              if (open === false && mes.spin !== true) {
                ToastStore.getState().delete(mes.unix);
              }
            }}
          >
            <div className="flex">
              <RadixToast.Title className="flex-1 font-medium">
                {mes.titl}
              </RadixToast.Title>
              <RadixToast.Close className="absolute top-0 right-0" aria-label="Close">
                <BaseButton
                  background="none"
                  color="text-gray-500"
                  hover="hover:text-black"
                  icon={<XMarkIcon />}
                />
              </RadixToast.Close>
            </div>
            <RadixToast.Description className="mt-2 ">
              {mes.text}
            </RadixToast.Description>

            {mes.spin && (
              <div className="w-full h-1 bg-transparent rounded overflow-hidden mt-2">
                <div className="h-full bg-blue-600 dark:bg-blue-400 progress-effect" />
              </div>
            )}
          </RadixToast.Root>
        );
      })}

      <RadixToast.Viewport className="fixed top-0 right-0 p-4 grid gap-4 w-full sm:w-[350px] list-none z-[2147483647] outline-none" />
    </RadixToast.Provider >
  );
};
