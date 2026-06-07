/** True when a string prop has non-whitespace content. */
export function isPresent(value: unknown): value is string {
  return typeof value === 'string' && value.trim().length > 0;
}
