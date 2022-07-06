import defineComponent from "baste";
import { styled } from "goober";
import { Heading } from "./Heading";
import { Profile } from "./Profile";

const RedDiv = styled("div")`
  color: red;
`;

export const Page = defineComponent("Page", async ({}, ctx) => {
  return (
    <main>
      <Heading className="from-doc" title="test">
        Hello world! {ctx.req.url}
      </Heading>
      <RedDiv>Should be red</RedDiv>
      <br />
      <Profile username="ibgrav" />
      <hr className="border-bottom" />
    </main>
  );
});
