"use client";

import { EditorForm } from "@/components/editor/EditorForm";
import { EditorStake } from "@/components/editor/EditorStake";
import { FundingInfoCard } from "@/components/card/FundingInfoCard";

export default function Page() {
  return (
    <EditorForm
      EditorStake={<EditorStake disabled={false} />}
      InfoCard={<FundingInfoCard />}
      Kind="claim"
      SendButtonTitle="Propose Claim"
    />
  );
};
