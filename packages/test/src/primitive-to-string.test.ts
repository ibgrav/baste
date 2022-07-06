import { describe, expect, it } from "vitest";
import { primitiveToString } from "../../baste/src/render/primitive-to-string";

describe("primitive-to-string", () => {
  it("empty", async () => {
    //@ts-ignore
    const empty = primitiveToString();
    expect(empty).toEqual("");
  });

  it("bad callback", async () => {
    const cb = primitiveToString(Symbol());
    expect(cb).toEqual("");
  });

  it("callback", async () => {
    const cb = primitiveToString(Symbol(), () => {
      return "test";
    });

    expect(cb).toEqual("test");
  });

  it("promise", async () => {
    const cb = await primitiveToString(
      () => {},
      async () => {
        return "test";
      }
    );

    expect(cb).toEqual("test");
  });
});
