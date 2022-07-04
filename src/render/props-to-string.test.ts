import { describe, expect, it } from "vitest";
import { propsToString } from "./props-to-string";

describe("props-to-string", () => {
  it("empty", async () => {
    //@ts-ignore
    const empty = propsToString();
    expect(empty).toEqual("");
  });

  it("children", async () => {
    const children = propsToString({ children: [1, 2, 3] });
    expect(children).toEqual("");
  });

  it("props", async () => {
    const simple = propsToString({
      className: [1, { two: true, no: false }, "three"],
      test: { test: true },
      onclick: "void 0;",
    });
    expect(simple).toEqual(` class="1 two three" test="test" onclick="void 0;"`);
  });
});
