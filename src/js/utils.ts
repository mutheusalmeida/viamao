import type { KeyParams } from "util";

export function validatePassword(password: string) {
  return new RegExp(
    /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[a-zA-Z\d@$!%*?&]{8,}$/,
  ).test(password);
}

export const getQueryKey = <T extends KeyParams>(key: string, params?: T) => {
  return [key, ...(params ? [params] : [])];
};
