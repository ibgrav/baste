import { attributeToString } from "./attribute-to-string";

export function propsToString<P>(props: JSX.Props<P>): string {
  let attributes = "";

  if (typeof props === "object") {
    Object.entries(props).map(async ([name, attr]) => {
      if (name !== "children" && name !== "css") {
        const value = attributeToString(attr);

        if (value) {
          if (name === "className") name = "class";
          attributes += ` ${name}="${value}"`;
        }
      }
    });
  }

  return attributes;
}
