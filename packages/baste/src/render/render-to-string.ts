import { isVoidType } from "./is-void-type";
import { primitiveToString } from "./primitive-to-string";
import { propsToString } from "./props-to-string";

declare global {
  interface BasteContext extends Record<string, unknown> {}
}

export async function renderToString(ctx: BasteContext, node: JSX.Children, name?: string): Promise<string> {
  return primitiveToString(node, async (node) => {
    node = await node;

    if (Array.isArray(node)) {
      const promises = node.map((n) => renderToString(ctx, n));
      return (await Promise.all(promises)).reduce((p, n) => p + n, "");
    }

    if (typeof node === "object") {
      const { __baste, type, props } = node as JSX.Element;

      if (__baste === 1 && typeof props === "object" && type) {
        if (typeof type === "string") {
          const attributes = propsToString(props);

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
          } catch (error) {
            const stack = (error as Error).stack;
            console.error("renderToString error");
            console.error(stack);
            console.error(node);
            const style = "color:#ff5151;background:black;padding:8px;";
            return `<details open style="${style}"><summary>RENDER ERROR</summary><pre>${stack}</pre></details>`;
          }
        }
      }
    }

    return "";
  });
}
