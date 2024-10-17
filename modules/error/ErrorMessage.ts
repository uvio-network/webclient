export const ErrorMessage = (err: any): string => {
  // Check if the given error has the structure of our apiserver error
  // responses. If the given error has a meta description, then we prefer that
  // description and return it here.
  if (err.meta && err.meta.desc) {
    return err.meta.desc;
  }

  if (err instanceof Error) {
    if (err.message.includes(". ")) {
      return err.message.split(". ")[0] + ".";
    }

    return err.message;
  }

  return String(err);
};
