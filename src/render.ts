declare global {
  interface BasteContext {
    stylesheet: Array<string>;
  }
}

export async function render(context: BasteContext, node: JSX.Element) {
  return await renderToString(context, node);
}

export async function renderToString(context: BasteContext, node: unknown): Promise<string> {
  if (Array.isArray(node)) {
    const promises = node.map((n) => renderToString(context, n));
    return (await Promise.all(promises)).reduce((p, n) => p + n, "");
  }

  if (node === null) return "";
  if (node === undefined) return "";
  if (typeof node === "boolean") return "";
  if (typeof node === "string") return node;
  if (typeof node === "number") return String(node);

  if (typeof node === "object") {
    const { __baste, type, props } = node as JSX.Element;

    if (__baste === 1 && type && props) {
      if (typeof type === "string") {
        if (props.css) {
          const className = renderStylesheet(context, props.css);

          if (props.className) {
            if (Array.isArray(props.className)) props.className.push(className);
            if (typeof props.className === "string") props.className += ` ${className}`;
            if (typeof props.className === "object") (props.className as Record<string, any>)[className] = true;
          } else {
            props.className = className;
          }
        }

        const attributes = renderProps(context, props);
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
}

function renderProps(ctx: BasteContext, props: JSX.Props<unknown>): string {
  let attributes = "";

  for (let [name, attr] of Object.entries(props)) {
    if (name !== "children" && name !== "css") {
      const value = renderAttribute(attr);

      if (value) {
        if (name === "className") name = "class";
        attributes += ` ${name}="${value}"`;
      }
    }
  }

  return attributes;
}

function renderAttribute(attr: JSX.Attribute): string {
  if (attr === null) return "";
  if (attr === undefined) return "";
  if (typeof attr === "boolean") return "";
  if (typeof attr === "string") return attr;
  if (typeof attr === "number") return String(attr);

  if (Array.isArray(attr)) {
    return attr
      .map((c) => renderAttribute(c))
      .filter(Boolean)
      .join(" ");
  }

  if (typeof attr === "object") {
    const keys = Object.keys(attr).filter((key) => Boolean(attr[key]));
    return renderAttribute(keys);
  }

  return "";
}

function renderCss(context: BasteContext, css: JSX.CSS): string {
  let styles = "";

  for (const [key, val] of Object.entries(css)) {
    if (key.startsWith("&")) {
      const style = renderCss(context, val);
    } else {
      const value = renderAttribute(val);
      if (value) styles += `${key}: ${value};`;
    }
  }

  return styles;
}

const classNamePrefix = (i: number) => `b${i}`;

function renderStylesheet(context: BasteContext, css: JSX.CSS): string {
  let styles = renderCss(context, css);
  let index = context.stylesheet.indexOf(styles);

  if (index === -1) {
    index = context.stylesheet.length;
    context.stylesheet.push(`.${classNamePrefix(index)}{${styles}}`);
  }

  return classNamePrefix(index);
}
