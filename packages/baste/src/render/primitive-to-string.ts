export function primitiveToString<V extends unknown>(
  value: V,
  fn?: (val: Exclude<V, JSX.Primitive>) => string | Promise<string>
): string | Promise<string> {
  if (value === null || value === undefined || value === false) return "";
  if (value === true) return "true";
  if (typeof value === "string") return value;
  if (typeof value === "number") return String(value);
  if (typeof fn === "function") return fn(value as Exclude<V, JSX.Primitive>);
  return "";
}
