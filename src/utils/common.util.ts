export const validateUrl = (input: string): boolean => {
  try {
    if (!input) return false;
    if (!input.startsWith("https://")) return false;
    new URL(input);
    return true;
  } catch (e) {
    return false;
  }
};

export const debounce = <TFn extends (...args: any[]) => any>(
  fn: TFn,
  ms: number = 200,
): ((...args: Parameters<TFn>) => void) => {
  let timeout: ReturnType<typeof setTimeout>;
  return (...args: Parameters<TFn>) => {
    if (timeout) clearTimeout(timeout);
    timeout = setTimeout(() => fn(...args), ms);
  };
};

export const clamp = (val: number, min: number, max: number) => {
  if (val < min) val = min;
  if (val > max) val = max;
  return val;
};
