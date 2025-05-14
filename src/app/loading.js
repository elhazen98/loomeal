import Image from "next/image";

export default function Loading() {
    return (
        <div className="flex justify-center items-center h-screen">
            <div className="flex justify-center item-center h-full w-full">
                <div className="flex items-center">
                    <Image
                        width={60}
                        height={60}
                        src="/loomeal.svg"
                        alt="loomeal.svg"
                        className="animate-spin"
                    />
                </div>
            </div>
        </div>
    );
}
