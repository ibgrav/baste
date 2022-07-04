import { primitiveToString } from "./primitive-to-string";

export function attributeToString(attr: JSX.Attribute): string {
  return primitiveToString(attr, (value) => {
    if (Array.isArray(value)) {
      return value.map(attributeToString).filter(Boolean).join(" ");
    }

    if (typeof value === "object") {
      const keys = Object.keys(value).filter((key) => Boolean(value[key]));
      return attributeToString(keys);
    }

    return "";
  }) as string;
}
