import { defineComponent } from "baste";

interface HeadingProps {
  title: string;
}

export const Heading = defineComponent<HeadingProps>("Heading", ({ children, className }, { req }) => {
  return <h1 className={["test", className]}>{children}</h1>;
});
