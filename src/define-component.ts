export function defineComponent<P>(basteFunction: JSX.Component<P>) {
  return function jsxElement(props: JSX.Props<P>, ctx: BasteContext) {
    return basteFunction(props, ctx) as JSX.Element;
  };
}
