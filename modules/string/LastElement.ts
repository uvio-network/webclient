import { SplitList } from "@/modules/string/SplitList";

// LastElement returns the last path element of the current page's URL, in
// decoded URI component form.
export const LastElement = (str: string): string => {
  const spl = SplitList(str, "/");

  if (spl.length > 1) {
    return decodeURIComponent(spl[spl.length - 1]);
  }

  return "";
};
