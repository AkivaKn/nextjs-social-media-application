import { getServerSession } from "next-auth";
import { authOptions } from "./api/auth/[...nextauth]/route";

export default async function Page() {
  const session = await getServerSession(authOptions);
  console.log(session?.user,'in app page');
  return (
  <>
    {
      session?.user?.username?(
      <div>{session.user.username}</div>
    ): (
      <div>Not Logged In</div>
    )}
      <p>App</p>
      </>
  );
}
