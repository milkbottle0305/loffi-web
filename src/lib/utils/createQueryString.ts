export const createQueryString = (params?: Record<string, string>): string => {
  if (!params) {
    return '';
  }

  const queryParams = new URLSearchParams();

  Object.keys(params).forEach((key) => {
    const value = params[key];
    if (value) {
      queryParams.append(key, value);
    }
  });

  return queryParams.toString();
};
