// ClaimPage returns the claim ID of the given URL path, if any.
export const ClaimPage = (str: string): string => {
  const mat = str.match(/^\/?claim\/(\d+)$/);
  return mat ? mat[1] : "";
};
