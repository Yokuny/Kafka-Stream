/** Left-to-right function composition: pipe(f, g, h)(x) = h(g(f(x))) */
export const pipe =
  <T>(...fns: Array<(arg: T) => T>) =>
  (value: T): T =>
    fns.reduce((acc, fn) => fn(acc), value);
