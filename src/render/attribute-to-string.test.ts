import { describe, expect, it } from "vitest";
import { attributeToString } from "./attribute-to-string";

describe("attribute-to-string", () => {
  it("empty", () => {
    //@ts-ignore
    const empty = attributeToString();
    expect(empty).toEqual("");
  });

  it("null", () => {
    const value = attributeToString(null);
    expect(value).toEqual("");
  });

  it("undefined", () => {
    const value = attributeToString(undefined);
    expect(value).toEqual("");
  });

  it("string", () => {
    const value = attributeToString("test");
    expect(value).toEqual("test");
  });

  it("number", () => {
    const value = attributeToString(10);
    expect(value).toEqual("10");
  });

  it("object", () => {
    const value = attributeToString({ one: true, two: false });
    expect(value).toEqual("one");
  });

  it("array", () => {
    const value = attributeToString([null, 1, "two", undefined, { three: true, four: null }]);
    expect(value).toEqual("1 two three");
  });

  it("fallback", () => {
    //@ts-ignore
    const value = attributeToString(Symbol());
    expect(value).toEqual("");
  });
});
