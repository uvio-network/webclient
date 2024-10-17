export const ErrorMessage = (err: any): string => {
  if (err instanceof Error) {
    if (err.message.includes(". ")) {
      return err.message.split(". ")[0] + ".";
    }

    return err.message;
  }

  return String(err);
};
