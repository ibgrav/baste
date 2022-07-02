import { createServer, IncomingMessage, ServerResponse } from "http";
import { Doc } from "./Doc";
import { Page } from "./Page";
import { render } from "baste";

declare global {
  interface BasteContext {
    req: IncomingMessage;
    res: ServerResponse;
    cache: Record<string, any>;
  }
}

const cache: BasteContext["cache"] = {};

const server = createServer(async (req, res) => {
  if (req.url?.includes("favicon")) return res.end("");

  res.setHeader("content-type", "text/html");
  res.statusCode = 200;

  const ctx: BasteContext = {
    stylesheet: [],
    cache,
    req,
    res,
  };

  const page = await render(ctx, <Page />);
  const rendered = await render(ctx, <Doc>{page}</Doc>);

  if (!res.headersSent) {
    res.end(rendered);
  }
});

server.listen(4000, () => {
  console.log("\nhttp://localhost:4000/\n");
});
