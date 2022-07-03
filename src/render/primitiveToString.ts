export async function primitiveToString<V>(
  value: V,
  fn?: (val: Exclude<V, JSX.Primitive>) => string | Promise<string>
): Promise<string> {
  if (value === null) return "";
  if (value === undefined) return "";
  if (typeof value === "boolean") return "";
  if (typeof value === "string") return value;
  if (typeof value === "number") return String(value);
  if (fn) return fn(value as Exclude<V, JSX.Primitive>);
  return "";
}
