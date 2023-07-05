export const sanitizeInput = (input: string) => {
  return input
    .toLowerCase()
    .trim()
    .replace(/[^a-zA-Z]/g, '');
};
