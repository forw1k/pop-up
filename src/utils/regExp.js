export const preparePhoneNumber = (num) => {
  return num.replace(/[() \s-]+/g, '');
};
