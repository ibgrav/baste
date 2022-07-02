import { template } from "baste";
import { Heading } from "./Heading";
import { Profile } from "./Profile";

export const Page = template(async () => {
  return (
    <main>
      <Heading className="from-doc" title="test">
        Hello world!
      </Heading>
      <Profile username="ibgrav" />
    </main>
  );
});
