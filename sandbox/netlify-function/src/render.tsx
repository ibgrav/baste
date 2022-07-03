import { defineComponent, renderToString } from "baste";

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
        <h1>Hello World change 3</h1>
      </body>
    </html>
  );
});
