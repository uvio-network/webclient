import * as Separator from "@/components/page/separator";

import { LoadingStore } from "@/components/loading/LoadingStore";

interface Props {
  active: boolean;
  onClick: () => void;
  text: string;
}

export const PageButton = (props: Props) => {
  const { loading } = LoadingStore();

  if (loading) return <></>;

  return (
    <button
      className={`
        w-full
        ${props.active && "cursor-default"}
      `}
      onClick={props.onClick}
      type="button"
    >
      <h3 className={`
        pl-2 text-3xl
        ${!props.active && "text-gray-400 dark:text-gray-500"}
      `}>
        {props.text}
      </h3>

      <Separator.Horizontal highlight={props.active} />
    </button>
  );
};
