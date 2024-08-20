import { BaseLabel } from "@/components/label/BaseLabel";

interface Props {
  dashed: boolean;
  lifecycle: string;
}

export const LifecycleLabel = (props: Props) => {
  return (
    <BaseLabel dashed={props.dashed} rose={true} text={props.lifecycle} />
  );
};
