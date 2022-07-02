import { createServer } from "http";
import { Doc } from "./Doc";
import { render } from "baste";

declare global {
  interface BasteContext {
    url: string;
    cache: Record<string, any>;
  }
}

const cache: BasteContext["cache"] = {};

const server = createServer(async (req, res) => {
  if (req.url?.includes("favicon")) return res.end("");

  const ctx: BasteContext = {
    stylesheet: [],
    cache,
    url: req.url || "/",
  };

  const rendered = await render(ctx, <Doc />);

  res.setHeader("content-type", "text/html");
  res.statusCode = 200;
  res.end(rendered);
});

server.listen(4000, () => {
  console.log("\nhttp://localhost:4000/\n");
});
