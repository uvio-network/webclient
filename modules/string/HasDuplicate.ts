export const HasDuplicate = (lis: string[]): boolean => {
  const see = new Set<string>();

  for (const x of lis) {
    if (see.has(x)) {
      return true;
    }

    {
      see.add(x);
    }
  }

  return false;
};
