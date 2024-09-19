import * as React from "react";

interface Props {
  setOpen: (open: string) => void;
}

// The value field here has only one purpose, allowing the user to cancel the
// verification using the ESC key.
export const ValueField = (props: Props) => {
  return (
    <input
      style={{
        position: "absolute",
        opacity: 0,
        width: 0,
        height: 0,
        pointerEvents: "none"
      }}
      onKeyDown={(e: React.KeyboardEvent<HTMLInputElement>) => {
        if (e.key === "Escape") props.setOpen("");
      }}
      autoFocus={true}
      type="text"
    />
  );
};
