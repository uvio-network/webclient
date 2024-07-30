export interface ClaimOption {
  agree: boolean;
  stake: boolean;
}

export const ParseClaimOption = (opt: string): ClaimOption => {
  return {
    agree: opt.toLowerCase() === "true",
    stake: opt.toLowerCase() !== "",
  };
};
