import { primitiveToString } from "./primitiveToString";

export function attributeToString(attr: JSX.Attribute): Promise<string> {
  return primitiveToString(attr, async (value) => {
    if (Array.isArray(value)) {
      return (await Promise.all(value.map((c) => attributeToString(c)))).filter(Boolean).join(" ");
    }

    if (typeof value === "object") {
      const keys = Object.keys(value).filter((key) => Boolean(value[key]));
      return attributeToString(keys);
    }

    return "";
  });
}
