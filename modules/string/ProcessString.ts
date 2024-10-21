import { SplitList } from "@/modules/string/SplitList";
import { TrimWhitespace } from "@/modules/string/TrimWhitespace";

interface Processor {
  [key: string]: (word: string) => string;
};

export const ProcessString = (str: string, pro: Processor): string => {
  return SplitList(TrimWhitespace(str), " ").map((x) => {
    for (const k in pro) {
      if (x.toLowerCase().includes(k.toLowerCase())) {
        return pro[k](k);
      }
    }

    return x;
  }).join(" ");
};
