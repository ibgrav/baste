import { assert, describe, it } from "vitest";
import { defineComponent } from "../../baste/src/define-component";

describe("define-component", () => {
  it("empty", async () => {
    //@ts-ignore
    const empty = defineComponent();
    assert.isFunction(empty);
    //@ts-ignore
    assert.isObject(empty());
  });

  it("simple", async () => {
    const simple = defineComponent("simple", () => {
      return <div>hello world!</div>;
    });
    assert.isFunction(simple);
    assert.isObject(simple({}, {}));
  });

  it("async", async () => {
    const asy = defineComponent("async", async () => {
      return <>async component</>;
    });
    assert.isFunction(asy);
    assert.isObject(await asy({}, {}));
  });
});
