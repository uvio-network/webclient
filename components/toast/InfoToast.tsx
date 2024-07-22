import * as Toast from "@radix-ui/react-toast";

interface Props { }

export const InfoToast = (props: Props) => {
  return (
    <Toast.Root
      className="p-4 bg-yellow-300 text-black rounded-md items-center data-[state=open]:animate-slideIn data-[state=closed]:animate-hide data-[swipe=move]:translate-x-[var(--radix-toast-swipe-move-x)] data-[swipe=cancel]:translate-x-0 data-[swipe=cancel]:transition-[transform_200ms_ease-out] data-[swipe=end]:animate-swipeOut"
    >
      <Toast.Title className="font-medium">
        Toast Title
      </Toast.Title>
      <Toast.Description>
        foo bar toast description
      </Toast.Description>
    </Toast.Root>
  );
};
