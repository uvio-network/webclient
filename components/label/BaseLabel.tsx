interface Props {
  colour: "blue" | "rose" | "gray";
  dashed?: boolean;
  text: string;
}

export const BaseLabel = (props: Props) => {
  return (
    <div
      className={`
        w-fit mr-2 px-1 py-[1px] rounded
        text-sm font-mono font-medium border
        ${props.dashed === true ? "border-dashed" : ""}
        ${props.colour === "blue" ? "bg-sky-100 dark:bg-sky-900 text-sky-600 dark:text-sky-400 border-sky-500" : ""}
        ${props.colour === "gray" ? "bg-gray-50 dark:bg-gray-900 text-gray-400 dark:text-gray-500 border-color" : ""}
        ${props.colour === "rose" ? "bg-rose-100 dark:bg-rose-900 text-rose-600 dark:text-rose-400 border-rose-500" : ""}
      `}
    >
      {props.text}
    </div>
  );
};
