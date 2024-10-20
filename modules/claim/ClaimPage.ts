export const ClaimPage = (str: string): boolean => {
  const claimPattern = /^\/?claim\/\d+$/;
  return claimPattern.test(str);
};
