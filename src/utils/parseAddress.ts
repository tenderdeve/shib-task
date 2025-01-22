export const parseAddress = (address: string) => {
  return address ? address
    .substring(0, 4)
    .concat("....")
    .concat(address.substring(address.length - 4)): address;
};
