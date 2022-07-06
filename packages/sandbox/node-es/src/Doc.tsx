import { defineComponent } from "baste";
import { Heading } from "./Heading";
import { Profile } from "./Profile";

export const Doc = defineComponent(() => {
  return (
    <>
      {"<!DOCTYPE html>"}
      <html>
        <head>
          <title>Hello World!</title>
        </head>
        <body className="test">
          <Heading title="test">Hello world!</Heading>
          <Profile username="ibgrav" />
        </body>
      </html>
    </>
  );
});
