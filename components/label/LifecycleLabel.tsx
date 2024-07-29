import { BaseLabel } from "@/components/label/BaseLabel";

interface Props {
  lifecycle: string;
}

export const LifecycleLabel = (props: Props) => {
  return (
    <BaseLabel rose={true} text={props.lifecycle} />
  );
};
