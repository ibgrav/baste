import { JSX as JSXInternal } from "./types";

declare global {
  namespace JSX {
    type Type = JSXInternal.Type;
    type Props<P> = JSXInternal.Props<P>;
    type Element = JSXInternal.Element;
    type Component<P> = JSXInternal.Component<P>;
    type Attribute = JSXInternal.Attribute;
    type Children = JSXInternal.Children;
    type Primitive = JSXInternal.Primitive;

    interface IntrinsicElements extends JSXInternal.IntrinsicElements {}
  }
}

export function jsx(type: JSX.Type, props: JSX.Props<unknown>): JSX.Element {
  return { __baste: 1, type, props };
}

export const jsxs = jsx;
export const jsxDev = jsx;

export function Fragment(p: { children: unknown }): JSX.Element {
  return p?.children as JSX.Element;
}

export function h(type: JSX.Type, props: JSX.Props<unknown>, ...children: JSX.Children[]) {
  if (props.children) {
    if (Array.isArray(props.children)) children.push(...props.children);
    else children.push(props.children);
  }

  return jsx(type, { ...props, children: children as JSX.Children });
}
