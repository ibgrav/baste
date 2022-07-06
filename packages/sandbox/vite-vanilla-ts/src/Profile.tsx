import { defineComponent } from "baste";

interface ProfileProps {
  username: string;
}

export const Profile = defineComponent<ProfileProps>("profile", async ({ username }) => {
  const res = await fetch(`https://xapi.github.com/users/${username}`);
  const data = await res.json();

  return (
    <pre>
      {username}
      {JSON.stringify(data, null, 2)}
    </pre>
  );
});
