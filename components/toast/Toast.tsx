import * as React from "react";

import * as Toast from "@radix-ui/react-toast";

import { XMarkIcon } from "@/components/icon/base/XMarkIcon";
import { ToastBodyProps, ToastRootData, ToastRootState } from "@/components/toast/Interface";

// ToastRoot needs to be mounted in some react component using the reference of
// a toast object.
//
//     const err = ErrorToast();
//     <ToastRoot ref={err.ref()} />
//
// Once the ToastRoot component is setup, the toast object can be used in the
// local scope to emit a toast message.
//
//     err.new("something's wrong");
//
export class ToastRoot extends React.Component<{}, ToastRootState> {
  constructor(props: {}) {
    super(props);

    this.state = {
      dict: new Map(),
      size: 0,
    };
  }

  new(data: ToastRootData): void {
    this.setState((old) => {
      return {
        dict: old.dict.set(old.size + 1, data),
        size: old.size + 1,
      };
    });
  }

  render() {
    return (
      <>
        {[...this.state.dict.entries()].map(([key, val]) => (
          <Toast.Root
            key={key}
            className={`
              p-4
              text-black rounded-md items-center
              data-[state=open]:animate-slideIn data-[state=closed]:animate-hide data-[swipe=move]:translate-x-[var(--radix-toast-swipe-move-x)] data-[swipe=cancel]:translate-x-0 data-[swipe=cancel]:transition-[transform_200ms_ease-out] data-[swipe=end]:animate-swipeOut
              ${val.clss}
            `}
            onOpenChange={(open: boolean) => {
              if (open === false) {
                this.state.dict.delete(key);
              }
            }}
          >
            <Toast.Title className="relative font-medium">
              {val.titl}
              <Toast.Close className="float-right" aria-label="Close">
                <span className="text-gray-600 hover:text-gray-900">
                  <XMarkIcon />
                </span>
              </Toast.Close>
            </Toast.Title>
            <Toast.Description>
              {val.text}
            </Toast.Description>
          </Toast.Root>
        ))}
      </>
    );
  }
};

// ToastBody is a react component that we only use to wrap some super annoying
// workaround to make the currently used toast design work. The wrapped react
// component is ToastRoot, which is used in any given local scope in which toast
// messages are used to provide feedback about site interactions.
export class ToastBody extends React.Component<ToastBodyProps> {
  private reference: React.RefObject<ToastRoot>;

  constructor(props: ToastBodyProps) {
    super(props);

    this.reference = React.createRef<ToastRoot>();
  }

  ref(): React.RefObject<ToastRoot> {
    return this.reference;
  }

  new(text: string): void {
    this.reference.current?.new({
      clss: this.props.clss,
      text: text,
      titl: this.props.titl,
    });
  }

  render() {
    return this.reference.current?.render();
  }
};

export const ErrorToast = (): ToastBody => {
  return new ToastBody({
    clss: "bg-red-500",
    titl: "Error",
  });
};

export const InfoToast = (): ToastBody => {
  return new ToastBody({
    clss: "bg-yellow-300",
    titl: "Info",
  });
};

export const SuccessToast = (): ToastBody => {
  return new ToastBody({
    clss: "bg-green-500",
    titl: "Success",
  });
};
