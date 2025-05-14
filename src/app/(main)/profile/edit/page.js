import { prisma } from "@/util/prisma";
import { EditForm } from "./component/edit-form";
import { auth } from "@/lib/auth";

export default async function Page() {
    const session = await auth();

    const user = await prisma.user.findUnique({
        where: { id: session.user.id },
    });

    return (
        <div>
            <div className="text-2xl text-left font-extrabold mb-6">
                Edit Profile
            </div>
            <EditForm user={user} />
        </div>
    );
}
