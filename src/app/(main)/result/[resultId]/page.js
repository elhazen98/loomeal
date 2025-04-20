import { prisma } from "@/util/prisma";

export default async function Page({ params }) {
    const { resultId } = await params;
    const result = await prisma.result.findUnique({
        where: { id: resultId },
    });

    return <div>{JSON.stringify(result)}</div>;
}
