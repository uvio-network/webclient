export const TrimWhitespace = (str: string): string => {
  if (str === undefined) return "";
  return str.replace(/\s+/g, " ").trim();
};
