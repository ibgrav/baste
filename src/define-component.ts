export function defineComponent<P>(name: string = "", basteFunction: JSX.Component<P>) {
  return function jsxElement(props: JSX.Props<P>, ctx: BasteContext): JSX.Element {
    try {
      const element = basteFunction(props, ctx) as JSX.Element;
      if (ctx.config?.name !== false) element.props.__n = name;
      return element as JSX.Element;
    } catch (e) {}

    return { __baste: 1, type: "", props: { __n: name } };
  };
}
