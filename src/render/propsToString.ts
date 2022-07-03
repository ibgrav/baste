import { attributeToString } from "./attributeToString";

export async function propsToString(props: JSX.Props<unknown>): Promise<string> {
  let attributes = "";

  await Promise.all(
    Object.entries(props).map(async ([name, attr]) => {
      if (name !== "children" && name !== "css") {
        const value = await attributeToString(attr);

        if (value) {
          if (name === "className") name = "class";
          attributes += ` ${name}="${value}"`;
        }
      }
    })
  );

  return attributes;
}
