import { BaseLabel } from "@/components/label/BaseLabel";

interface Props {
  text: string;
}

export const CategoryLabel = (props: Props) => {
  return (
    <BaseLabel blue={true} text={props.text} />
  );
};
