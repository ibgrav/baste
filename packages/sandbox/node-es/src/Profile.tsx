import defineComponent from "baste";
import fetch from "node-fetch";

interface ProfileProps {
  username: string;
}

export const Profile = defineComponent<ProfileProps>("profile", async ({ username }, { cache }) => {
  if (!cache[username]) {
    const res = await fetch(`https://api.github.com/users/${username}`);
    cache[username] = await res.json();
  }

  return <pre>{JSON.stringify(cache[username], null, 2)}</pre>;
});
