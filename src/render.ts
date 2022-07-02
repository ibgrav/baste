declare global {
  interface BasteContext {
    stylesheet: Array<string>;
  }
}

let number = "number";
let string = "string";
let object = "object";
let boolean = "boolean";
let func = "function";

export async function render(context: BasteContext, node: JSX.Element) {
  return await renderToString(context, node);
}

export async function renderToString(context: BasteContext, node: unknown): Promise<string> {
  if (Array.isArray(node)) {
    let promises = node.map((n) => renderToString(context, n));
    return (await Promise.all(promises)).reduce((p, n) => p + n, "");
  }

  let type = typeof node;

  if (type === boolean) return "";
  if (type === number) return String(node);
  if (type === string) return node as string;
  if (!node) return "";

  if (type === object) {
    let { __baste, type, props } = node as JSX.Element;

    if (__baste === 1 && type && props) {
      if (typeof type === "string") {
        if (props.css) {
          let className = renderStylesheet(context, props.css);

          if (props.className) {
            if (Array.isArray(props.className)) props.className.push(className);
            if (typeof props.className === string) props.className += ` ${className}`;
            if (typeof props.className === object) (props.className as Record<string, any>)[className] = true;
          } else {
            props.className = className;
          }
        }

        let attributes = renderProps(props);
        let children = await renderToString(context, props.children);

        return `<${type}${attributes}>${children}</${type}>`;
      }

      if (typeof type === func) {
        try {
          let newnode = await type(props, context);
          return renderToString(context, newnode);
        } catch (e) {
          throw new Error("baste render error");
        }
      }
    }
  }

  return "";
}

function renderProps(props: JSX.Props<unknown>): string {
  let attributes = "";

  for (let [name, attr] of Object.entries(props)) {
    if (name !== "children" && name !== "css") {
      let value = renderAttribute(attr);

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

  let type = typeof attr;

  if (type === boolean) return "";
  if (type === string) return attr as string;
  if (type === number) return String(attr);

  if (Array.isArray(attr)) {
    return attr
      .map((c) => renderAttribute(c))
      .filter(Boolean)
      .join(" ");
  }

  if (type === object) {
    let keys = Object.keys(attr).filter((key) => Boolean((attr as Record<string, unknown>)[key]));
    return renderAttribute(keys);
  }

  return "";
}

function renderCss(context: BasteContext, css: JSX.CSS): string {
  let styles = "";

  for (let [key, val] of Object.entries(css)) {
    if (key.startsWith("&")) {
      let style = renderCss(context, val);
    } else {
      let value = renderAttribute(val);
      if (value) styles += `${key}: ${value};`;
    }
  }

  return styles;
}

let classNamePrefix = (i: number) => `b${i}`;

function renderStylesheet(context: BasteContext, css: JSX.CSS): string {
  let styles = renderCss(context, css);
  let index = context.stylesheet.indexOf(styles);

  if (index === -1) {
    index = context.stylesheet.length;
    context.stylesheet.push(`.${classNamePrefix(index)}{${styles}}`);
  }

  return classNamePrefix(index);
}
