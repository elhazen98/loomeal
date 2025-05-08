import Image from "next/image";

export const LoadingSpinner = () => {
    return (
        <div className="flex justify-center items-center h-full w-full">
            <div className="flex flex-col gap-8 items-center">
                <Image
                    width={40}
                    height={40}
                    src="loomeal.svg"
                    alt="loomeal.svg"
                    className="animate-spin"
                />
                <div className="font-bold animate-bounce">
                    Loading Content ...
                </div>
            </div>
        </div>
    );
};
