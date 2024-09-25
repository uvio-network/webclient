import * as React from "react";

interface Props {
  amount: number;
  precision: number;
  token: string;
}

export const StakeField = (props: Props) => {
  return (
    <input
      className="block w-full mr-2 p-2 py-1 background placeholder outline-none"
      disabled={true}
      placeholder={`${props.amount.toFixed(props.precision)} ${props.token}`}
      type="text"
    />
  );
};
