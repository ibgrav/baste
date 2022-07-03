import { defineComponent, renderToString } from "https://unpkg.com/baste@0.0.15/dist/index.mjs";

export async function render() {
  return await renderToString({}, <Doc />);
}

const Doc = defineComponent(() => {
  return (
    <html>
      <head>
        <title>Test!</title>
      </head>
      <body>
        <h1>Hello World change 2</h1>
      </body>
    </html>
  );
});
