declare global {
  interface BasteContext {}
}

export async function render(context: BasteContext, node: JSX.Element) {
  console.log({ node });
  return await renderToString(context, node);
}

export async function renderToString(context: BasteContext, node: unknown): Promise<string> {
  console.log("node", node);

  if (Array.isArray(node)) {
    const promises = node.map((n) => renderToString(context, n));
    return (await Promise.all(promises)).reduce((p, n) => p + n, "");
  }

  if (node === null) return "";
  if (node === undefined) return "";

  if (typeof node === "string") return node;
  if (typeof node === "number") return String(node);

  if (typeof node === "object") {
    const { __b, type, props } = node as JSX.Element;

    if (__b === 1) {
      if (typeof type === "string") {
        let children = await renderToString(context, props.children);
        return `<${type}>${children}</${type}>`;
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
}
