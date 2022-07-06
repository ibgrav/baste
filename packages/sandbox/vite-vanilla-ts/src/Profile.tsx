import baste from "baste";

interface ProfileProps {
  username: string;
}

export const Profile = baste<ProfileProps>("profile", async ({ username }) => {
  const res = await fetch(`https://api.github.com/users/${username}`);
  const data = await res.json();

  return (
    <pre>
      {username}
      {JSON.stringify(data, null, 2)}
    </pre>
  );
});
