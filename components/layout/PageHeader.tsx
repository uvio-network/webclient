import Link from "next/link";

import * as React from "react";

import { BaseButton } from "@/components/button/BaseButton";
import { LoadingStore } from "@/components/loading/LoadingStore";
import { NoButton } from "@/components/button/NoButton";

interface Props {
  icon?: React.ReactElement;
  link?: string;
  titl: string;
}

export const PageHeader = (props: Props) => {
  const { loading } = LoadingStore();

  if (loading) return <></>;

  return (
    <div className="grid place-content-end">
      {props.icon && props.link && props.link !== "" ? (
        <Link
          href={props.link}
        >
          <BaseButton
            background="none"
            icon={props.icon}
            position="left"
            text={<>{props.titl}</>}
          />
        </Link>
      ) : (
        <NoButton
          text={props.titl}
        />
      )}
    </div>
  );
};
