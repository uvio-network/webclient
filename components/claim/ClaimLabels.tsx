import { LabelList } from "@/components/claim/LabelList";

interface Props {
  labels: string[];
  lifecycle: string;
}

export const ClaimLabels = (props: Props) => {
  return (
    <div className="px-2">
      <LabelList
        labels={props.labels}
        lifecycle={props.lifecycle}
      />
    </div>
  );
};
