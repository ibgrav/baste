import defineComponent from "baste";

interface HeadingProps {
  title: string;
}

export const Heading = defineComponent<HeadingProps>("heading", ({ children }, context) => {
  return (
    <h1>
      {children} - url: {context.url}
    </h1>
  );
});
