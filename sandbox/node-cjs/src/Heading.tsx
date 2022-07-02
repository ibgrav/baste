import { template } from "baste";

interface HeadingProps {
  title: string;
}

export const Heading = template<HeadingProps>(({ children }, context) => {
  return (
    <h1>
      {children} - url: {context.url}
    </h1>
  );
});
