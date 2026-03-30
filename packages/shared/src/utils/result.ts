import type { Result } from '../interfaces/result.interface.js';

export const ok = <T>(data: T): Result<T, never> => ({ success: true, data });

export const err = <E = Error>(error: E): Result<never, E> => ({ success: false, error });

export const isOk = <T, E>(r: Result<T, E>): r is { success: true; data: T } => r.success === true;

export const isErr = <T, E>(r: Result<T, E>): r is { success: false; error: E } => r.success === false;

/** Maps over a Result — only applies fn if success */
export const mapResult = <T, U, E>(result: Result<T, E>, fn: (data: T) => U): Result<U, E> => (result.success ? ok(fn(result.data)) : err(result.error));

/** Chains Result-returning async functions */
export const chainResult = async <T, U, E>(result: Result<T, E>, fn: (data: T) => Promise<Result<U, E>>): Promise<Result<U, E>> =>
  result.success ? fn(result.data) : Promise.resolve(err(result.error));
