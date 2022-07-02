import { JSX as JSXInternal } from "./types";

declare global {
  namespace JSX {
    type CSS = JSXInternal.CSS;
    type Type = JSXInternal.Type;
    type Props<P> = JSXInternal.Props<P>;
    type Element = JSXInternal.Element;
    type Component<P> = JSXInternal.Component<P>;
    type Attribute = JSXInternal.Attribute;

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
