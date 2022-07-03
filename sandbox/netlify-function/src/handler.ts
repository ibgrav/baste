import { Handler } from "@netlify/functions";
import { render } from "./render";

export const handler: Handler = async (event) => {
  return {
    statusCode: 200,
    body: await render(),
  };
};
