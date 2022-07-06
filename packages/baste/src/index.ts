export * from "./types";

export { renderToString } from "./render/render-to-string";

import { defineComponent as def } from "./define-component";

export default def;
export const defineComponent = def;
