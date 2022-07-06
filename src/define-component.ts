export function defineComponent<P>(name: string | JSX.Component<P>, type?: JSX.Component<P>) {
  return function definedComponent(props: JSX.Props<P>, context: BasteContext): JSX.Element {
    if (typeof name === "function") return name(props, context) as JSX.Element;

    if (typeof type === "function") {
      const element = type(props, context);

      if (typeof element === "object") {
        if ((element as JSX.Element).__baste === 1) {
          (element as JSX.Element).props.__n = name;
          return element as JSX.Element;
        }

        if (typeof (element as Promise<JSX.Element>).then === "function") {
          return (element as Promise<JSX.Element>).then((el) => {
            el.props.__n = name;
            return el;
          }) as unknown as JSX.Element;
        }
      }
    }

    return { __baste: 1, type: "", props: {} };
  };
}
