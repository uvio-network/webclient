import * as React from "react";

import { BaseButton } from "@/components/button/BaseButton";
import { BaseLabel } from "@/components/label/BaseLabel";
import { ClaimObject } from "@/modules/claim/ClaimObject";
import { ExpandIcon } from "@/components/icon/ExpandIcon";
import { SelectBox } from "@/components/select/SelectBox";
import { SelectItem } from "@/components/select/SelectBox";
import { Tooltip } from "@/components/tooltip/Tooltip";

interface Props {
  claims: ClaimObject[];
  current: ClaimObject;
  setCurrent: (cur: ClaimObject) => void;
}

export const ClaimLifecycleMenu = (props: Props) => {
  return (
    <div className="flex h-full">
      <SelectBox
        onSelect={(key: string) => {
          const sel = props.claims.find((x) => x.id() === key);
          props.setCurrent(sel!);
          window.history.pushState(null, "", `/claim/${key}`);
        }}
        selected={{
          key: props.current.id(),
          val: curSel(props),
        }}
        values={strSel(props.claims)}
      />
    </div>
  );
};

const sinSel = (cla: ClaimObject): SelectItem => {
  return {
    key: cla.id(),
    val: <BaseLabel
      color={cla.lifecycle().color()}
      text={cla.lifecycle().phase()}
    />,
  };
};

const strSel = (cla: ClaimObject[]): SelectItem[] => {
  return cla.map((x) => sinSel(x));
};

const curSel = (props: Props) => {
  if (props.current.pending() || props.claims.length === 1) {
    return (
      <Tooltip
        content={
          <>
            Lifecycle <strong>{props.current.lifecycle().phase()}</strong>
            once the claim&apos;s transaction has been finalized onchain.
          </>
        }
        trigger={
          <BaseLabel
            className="cursor-default"
            color={props.current.lifecycle().color()}
            dashed={props.current.lifecycle().pending()}
            text={props.current.lifecycle().phase()}
          />
        }
      />
    );
  }

  return (
    <BaseButton
      background="none"
      icon={<ExpandIcon />}
      padding="p-0"
      position="left"
      text={
        <BaseLabel
          color={props.current.lifecycle().color()}
          text={props.current.lifecycle().phase()}
        />
      }
    />
  );
};
