import defineComponent from "baste";
import { extractCss } from "goober";

export const Doc = defineComponent("Doc", async ({ children }) => {
  const css = extractCss();

  return (
    <>
      {"<!DOCTYPE html>"}
      <html>
        <head lang="en">
          <meta name="viewport" content="width=device-width, initial-scale=1.0" />
          <title>Hello World!</title>
          <style id="__goober">{css}</style>
        </head>
        <body>{children}</body>
      </html>
    </>
  );
});
