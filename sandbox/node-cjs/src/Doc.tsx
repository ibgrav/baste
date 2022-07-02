import { template } from "baste";

export const Doc = template(async ({ children }, { stylesheet }) => {
  console.log({ stylesheet });

  return (
    <>
      {"<!DOCTYPE html>"}
      <html>
        <head lang="en">
          <meta name="viewport" content="width=device-width, initial-scale=1.0" />
          <title>Hello World!</title>
          <style>{stylesheet.reduce((p, n) => p + n, "")}</style>
        </head>
        <body>{children}</body>
      </html>
    </>
  );
});
