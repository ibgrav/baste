import { describe, expect, it } from "vitest";
import { isVoidType } from "./is-void-type";

describe("is-void-type", () => {
  it("empty", async () => {
    //@ts-ignore
    const empty = isVoidType();
    expect(empty).toEqual(false);
  });

  it("true", async () => {
    const br = isVoidType("br");
    expect(br).toEqual(true);
  });

  it("false", async () => {
    const div = isVoidType("div");
    expect(div).toEqual(false);
  });
});
