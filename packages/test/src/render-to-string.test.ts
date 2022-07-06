import { describe, expect, it } from "vitest";
import { jsx } from "../../baste/src/jsx-runtime";
import { renderToString } from "../../baste/src/render/render-to-string";

describe("render-to-string", () => {
  it("empty", async () => {
    //@ts-ignore
    const empty = await renderToString();
    expect(empty).toEqual("");
  });

  it("bad context", async () => {
    //@ts-ignore
    const empty = await renderToString([], jsx("div", { children: ["test"] }));
    expect(empty).toEqual("<div>test</div>");
  });

  it("throw", async () => {
    const hasError = await renderToString(
      {},
      jsx(() => {
        throw new Error("ERROR!");
      }, {})
    );

    expect(hasError).toEqual("");
  });

  it("primitive", async () => {
    const empty = await renderToString({}, 0);
    expect(empty).toEqual("0");
  });

  it("void type", async () => {
    const empty = await renderToString({}, jsx("br", { children: "test" }));
    expect(empty).toEqual("<br>");
  });

  it("nested jsx", async () => {
    const empty = await renderToString(
      {},
      jsx(() => jsx("div", { children: [{ __baste: 1, type: () => jsx("br", {}), props: {} }] }), {})
    );
    expect(empty).toEqual("<div><br></div>");
  });
});
