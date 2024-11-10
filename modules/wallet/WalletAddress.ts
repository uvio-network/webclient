// The below code is copied from the connectkit source code since it does not
// look like they export the function to truncate addresses at this point.

const truncateRegex = /^(0x[a-zA-Z0-9]{4})[a-zA-Z0-9]+([a-zA-Z0-9]{4})$/;

export const truncateEthAddress = (address?: string, separator: string = "•••") => {
  if (!address) return "";
  const mat = address.match(truncateRegex);
  if (!mat) return address;
  return `${mat[1]}${separator}${mat[2]}`;
};
