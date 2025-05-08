import Image from "next/image";

export const LoadingSpinner = () => {
    return (
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
    );
};
