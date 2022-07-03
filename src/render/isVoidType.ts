export function isVoidType(type: string) {
  return ["area", "base", "br", "col", "embed", "hr", "img", "input", "link", "meta", "param", "source"].includes(type);
}
