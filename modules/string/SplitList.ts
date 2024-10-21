import { TrimWhitespace } from "./TrimWhitespace";

// SplitList takes a comma separated string and returns a string array contain
// its comma separated words.
//
//     "foo, bar  , baz  , hello world, duh  "
//
//     ["foo", "bar", "baz", "hello world", "duh"]
//
export const SplitList = (inp: string, sep: string = ","): string[] => {
  if (!inp || inp === "") return [];
  return inp.split(sep).map((x) => TrimWhitespace(x));
};
