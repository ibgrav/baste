export function template<P>(templateFunction: JSX.Component<P>) {
  return function jsxElement(props: JSX.Props<P>, context: BasteContext) {
    return templateFunction(props, context) as JSX.Element;
  };
}
