import * as React from "react";

import { EditorStore } from "@/modules/editor/EditorStore";
import { InfoCard } from "@/components/card/InfoCard";
import { useShallow } from "zustand/react/shallow";

export const FundingInfoCard = () => {
  const [funding, setFunding] = React.useState<string>("your funds");

  const { stake } = EditorStore(useShallow((state) => ({
    stake: state.stake,
  })));

  React.useEffect(() => {
    if (stake !== "") {
      const amo = EditorStore.getState().getAmount();
      const sym = EditorStore.getState().getSymbol();

      if (amo.num !== 0 && sym !== "") {
        const pre = EditorStore.getState().getToken().precision;
        setFunding(`${amo.num.toFixed(pre)} ${sym}`);
      } else {
        setFunding("your funds");
      }
    }
  }, [stake]);

  return (
    <InfoCard
      close={false}
      color="default"
      text={
        <>
          You are about to lock up ${funding} until this new market resolves.
          There is no guarantee of repayment.
        </>
      }
    />
  );
};
