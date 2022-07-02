import { JSX as JSXInternal } from "./types";

declare global {
  namespace JSX {
    type CSS = JSXInternal.CSS;
    type Type = JSXInternal.Type;
    type Props<P> = JSXInternal.Props<P>;
    type Element = JSXInternal.Element;
    type Component<P> = JSXInternal.Component<P>;
    type Attribute = JSXInternal.Attribute;
    type Children = JSXInternal.Children;

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

export function createElement(type: JSX.Type, props: JSX.Props<unknown>, ...children: JSX.Children[]) {
  return jsx(type, { ...props, children: children as JSX.Children });
}
