declare global {
  interface BasteContext {}
}

export async function render(context: BasteContext, node: JSX.Element) {
  return renderToString(context, node);
}

export async function renderToString(context: BasteContext, node: unknown): Promise<string> {
  return primitiveToString(node, async (node) => {
    if (Array.isArray(node)) {
      const promises = node.map((n) => renderToString(context, n));
      return (await Promise.all(promises)).reduce((p, n) => p + n, "");
    }

    if (typeof node === "object") {
      const { __baste, type, props } = node as JSX.Element;

      if (__baste === 1 && type && props) {
        if (typeof type === "string") {
          const attributes = await renderProps(props);
          const children = await renderToString(context, props.children);

          return `<${type}${attributes}>${children}</${type}>`;
        }

        if (typeof type === "function") {
          try {
            const newnode = await type(props, context);
            return renderToString(context, newnode);
          } catch (e) {
            throw new Error("baste render error");
          }
        }
      }
    }

    return "";
  });
}

async function renderProps(props: JSX.Props<unknown>): Promise<string> {
  let attributes = "";

  for (let [name, attr] of Object.entries(props)) {
    if (name !== "children" && name !== "css") {
      const value = await renderAttribute(attr);

      if (value) {
        if (name === "className") name = "class";
        attributes += ` ${name}="${value}"`;
      }
    }
  }

  return attributes;
}

function renderAttribute(attr: JSX.Attribute): Promise<string> {
  return primitiveToString(attr, (value) => {
    if (Array.isArray(value)) {
      return value
        .map((c) => renderAttribute(c))
        .filter(Boolean)
        .join(" ");
    }

    if (typeof value === "object") {
      const keys = Object.keys(value).filter((key) => Boolean(value[key]));
      return renderAttribute(keys);
    }

    return "";
  });
}

async function primitiveToString<V>(
  value: V,
  fn: (val: Exclude<V, JSX.Primitive>) => string | Promise<string>
): Promise<string> {
  if (value === null) return "";
  if (value === undefined) return "";
  if (typeof value === "boolean") return "";
  if (typeof value === "string") return value;
  if (typeof value === "number") return String(value);
  return fn(value as Exclude<V, JSX.Primitive>);
}
