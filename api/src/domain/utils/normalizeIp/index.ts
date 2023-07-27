export const normalizeIp = (ip?: string) => {
  return ip?.replace(/::ffff:/g, '');
};
