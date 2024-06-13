import { getServerSession } from "next-auth";
import { redirect } from "next/navigation";

export default async function Profile() {
    const session = await getServerSession();
    if (!session || !session.user) {
        redirect("/api/auth/signin")
    }
    return (
        <p>{session.user.name}</p>
    )
}