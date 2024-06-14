import { getServerSession } from "next-auth";
import CreatePost from "../components/CreatePost";
import { authOptions } from "../api/auth/[...nextauth]/route";

export default async function Page() {
    const session = await getServerSession(authOptions);
    return (
        <div>
            <CreatePost user_id={session?.user?.user_id} />
        </div>
    )
}