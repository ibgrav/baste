import { attributeToString } from "./attribute-to-string";

export function propsToString<P>(props: JSX.Props<P>): string {
  let attributes = "";

  if (typeof props === "object") {
    Object.entries(props).map(async ([name, attr]) => {
      if (name !== "children") {
        const value = attributeToString(attr);

        if (value) {
          if (name === "__n") {
            attributes += ` data-baste-${value}`;
          } else {
            if (name === "className") name = "class";
            if (value === "true") attributes += ` ${name}`;
            else attributes += ` ${name}="${value}"`;
          }
        }
      }
    });
  }

  return attributes;
}
