export default function Layout({ children }) {
    return (
        <div className="flex justify-center h-screen">
            <div className="flex flex-col max-w-[400px] w-full">
                <header className="h-12 flex justify-between items-center p-4 max-w-[400px] w-full backdrop-blur-sm z-50">
                    <div className="grid grid-cols-2 grid-rows-2 h-[22px] w-[21px] gap-[1px] hover:rotate-360 duration-150">
                        <div className="bg-primary row-span-2 rounded-xs" />
                        <div className="bg-primary rounded-full" />
                        <div className="bg-primary rounded-xs" />
                    </div>
                </header>
                <div className="flex-1 flex justify-center items-center">
                    {children}
                </div>
            </div>
        </div>
    );
}
