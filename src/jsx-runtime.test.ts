import { expect, describe, it, assert } from "vitest";
import * as runtime from "./jsx-runtime";

describe("jsx-runtime jsx", () => {
  it("empty", async () => {
    //@ts-ignore
    const empty = runtime.jsx();

    expect(empty.__baste).toEqual(1);
    expect(empty.type).toEqual("");
    assert.isObject(empty.props);
  });

  it("simple", async () => {
    const jsx = runtime.jsx("div", { className: "test" });

    expect(jsx.__baste).toEqual(1);
    expect(jsx.type).toEqual("div");
    expect(jsx.props.className).toEqual("test");
  });

  it("jsxs", async () => {
    const jsx = runtime.jsxs("div", { className: "test" });

    expect(jsx.__baste).toEqual(1);
    expect(jsx.type).toEqual("div");
    expect(jsx.props.className).toEqual("test");
  });

  it("jsxDev", async () => {
    const jsx = runtime.jsxDev("div", { className: "test" });

    expect(jsx.__baste).toEqual(1);
    expect(jsx.type).toEqual("div");
    expect(jsx.props.className).toEqual("test");
  });
});

describe("jsx-runtime Fragment", () => {
  it("empty", async () => {
    //@ts-ignore
    const empty = runtime.Fragment();
    expect(empty).toEqual(undefined);
  });

  it("simple", async () => {
    const simple = runtime.Fragment({ children: "test" });
    expect(simple).toEqual("test");
  });
});

describe("jsx-runtime createElement", () => {
  it("empty", async () => {
    //@ts-ignore
    const empty = runtime.h();

    expect(empty.__baste).toEqual(1);
    expect(empty.type).toEqual("");
    assert.isObject(empty.props);
  });

  it("simple", async () => {
    const simple = runtime.createElement("div", {});

    expect(simple.__baste).toEqual(1);
    expect(simple.type).toEqual("div");
  });

  it("simple children", async () => {
    const simple = runtime.createElement("div", { className: "test", children: "test" });

    expect(simple.__baste).toEqual(1);
    expect(simple.type).toEqual("div");
    expect(simple.props.className).toEqual("test");
    expect((simple as any).props.children[0]).toEqual("test");
  });

  it("array children", async () => {
    const simple = runtime.createElement("div", { className: "test", children: ["1"] }, "2", "3", "4");

    expect(simple.__baste).toEqual(1);
    expect(simple.type).toEqual("div");
    expect(simple.props.className).toEqual("test");
    expect((simple as any).props.children[3]).toEqual("1");
  });
});
