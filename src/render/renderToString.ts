import { isVoidType } from "./isVoidType";
import { primitiveToString } from "./primitiveToString";
import { propsToString } from "./propsToString";

declare global {
  interface BasteContext {}
}

export async function renderToString(ctx: BasteContext, node: JSX.Children): Promise<string> {
  return primitiveToString(node, async (node) => {
    if (Array.isArray(node)) {
      const promises = node.map((n) => renderToString(ctx, n));
      return (await Promise.all(promises)).reduce((p, n) => p + n, "");
    }

    if (typeof node === "object") {
      const { __baste, type, props } = node as JSX.Element;

      if (__baste === 1 && type && props) {
        if (typeof type === "string") {
          const attributes = await propsToString(props);

          if (isVoidType(type)) return `<${type}${attributes}>`;
          else {
            const children = await renderToString(ctx, props.children);
            return `<${type}${attributes}>${children}</${type}>`;
          }
        }

        if (typeof type === "function") {
          try {
            const newnode = await type(props, ctx);
            return renderToString(ctx, newnode);
          } catch (e) {
            throw new Error("baste render error");
          }
        }
      }
    }

    return "";
  });
}
