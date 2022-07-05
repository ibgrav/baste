export function jsx(type: JSX.Type = "", props: JSX.Props<unknown> = {}): JSX.Element {
  return { __baste: 1, type, props };
}

export const jsxs = jsx;
export const jsxDev = jsx;

export function Fragment(props: { children: unknown }) {
  return props?.children as JSX.Children;
}

export function h(type: JSX.Type, props: JSX.Props<unknown>, ...children: JSX.Children[]) {
  if (props?.children) {
    if (Array.isArray(props.children)) children.push(...props.children);
    else children.push(props.children);
  }

  return jsx(type, { ...props, children: children as JSX.Children });
}

export const createElement = h;
