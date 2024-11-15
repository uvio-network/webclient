import { TrimWhitespace } from "@/modules/string/TrimWhitespace";

interface Props {
  className?: string;
  color: "blue" | "gray" | "green" | "rose";
  dashed?: boolean;
  text: string;
}

export const BaseLabel = (props: Props) => {
  return (
    <div
      className={TrimWhitespace(`
        w-fit h-fit px-1 py-[1px] rounded
        text-sm font-mono font-medium border whitespace-nowrap
        ${props.dashed === true ? "border-dashed" : ""}
        ${props.className ? props.className : ""}
        ${props.color === "gray" ? " bg-gray-100    dark:bg-gray-800    text-gray-600    dark:text-gray-400    border-none" : ""}
        ${props.color === "green" ? "bg-emerald-100 dark:bg-emerald-800 text-emerald-600 dark:text-emerald-400 border-none" : ""}
        ${props.color === "blue" ? " bg-blue-100    dark:bg-blue-800    text-blue-600    dark:text-blue-400    border-none" : ""}
        ${props.color === "rose" ? " bg-rose-100    dark:bg-rose-800    text-rose-600    dark:text-rose-400    border-none" : ""}
      `)}
    >
      {props.text}
    </div>
  );
};
