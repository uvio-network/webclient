export const TrimWhitespace = (str: string): string => {
  return str.replace(/\s+/g, " ").trim();
};
