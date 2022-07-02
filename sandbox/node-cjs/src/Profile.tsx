import { template } from "baste";
import fetch from "node-fetch";

interface ProfileProps {
  username: string;
}

export const Profile = template<ProfileProps>(async ({ username }, { cache }) => {
  if (!cache[username]) {
    const res = await fetch(`https://api.github.com/users/${username}`);
    cache[username] = await res.json();
  }

  return <pre>{JSON.stringify(cache[username], null, 2)}</pre>;
});
