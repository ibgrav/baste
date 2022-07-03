export function defineComponent<P>(basteFunction: JSX.Component<P>) {
  return function jsxElement(props: JSX.Props<P>, ctx: BasteContext): JSX.Element {
    try {
      return basteFunction(props, ctx) as JSX.Element;
    } catch (e) {}

    return { __baste: 1, type: "", props: {} };
  };
}
