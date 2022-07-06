import { render } from "./render";

export async function handler(req: Request): Promise<Response> {
  const doc = await render();

  return new Response(doc, {
    status: 200,
    headers: {
      "content-type": "text/html",
    },
  });
}
