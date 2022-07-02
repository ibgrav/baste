import { template } from "baste";

interface HeadingProps {
  title: string;
}

export const Heading = template<HeadingProps>(({ children, className }, { req }) => {
  return (
    <h1
      className={["test", className]}
      css={{
        color: "red",
        "&:hover": {
          color: "blue",
        },
      }}
    >
      {children} - url: {req.url}
    </h1>
  );
});
