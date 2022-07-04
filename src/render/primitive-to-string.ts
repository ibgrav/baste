export function primitiveToString<V>(
  value: V,
  fn?: (val: Exclude<V, JSX.Primitive>) => string | Promise<string>
): string | Promise<string> {
  if (typeof value === "string") return value;
  if (typeof value === "number") return String(value);
  if (value === null || value === undefined || typeof value === "boolean") return "";
  if (typeof fn === "function") return fn(value as Exclude<V, JSX.Primitive>);
  return "";
}
