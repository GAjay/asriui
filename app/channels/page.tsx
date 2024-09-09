import AppIconCard from "@/components/misc/app-icon-card";
import Link from "next/link";
import Sidebar from "@/components/ui/auth-sidebar";
import Header from "@/components/ui/auth-header";

export default function Channels() {
    return (
        <div className="flex h-[100dvh] overflow-hidden">


            {/* Sidebar */}
            <Sidebar />
            {/* Content area */}
            <div className="relative flex flex-col flex-1 overflow-y-auto overflow-x-hidden">

                {/*  Site header */}
                <Header />

                <main className="grow [&>*:first-child]:scroll-mt-16">
                    <div className="flex h-[100dvh] overflow-hidden">

                        {/* Content area */}
                        <div className="relative flex flex-col flex-1 overflow-y-auto overflow-x-hidden">


                            <main className="grow [&>*:first-child]:scroll-mt-16">
                                <div className="px-4 sm:px-6 lg:px-8 py-8 w-full max-w-[96rem] mx-auto">
                                    <div>
                                        <div className="mt-8">
                                            <div className="sm:flex sm:justify-between sm:items-center mb-8">
                                                {/* Left: Title */}
                                                <div className="mb-4 sm:mb-0">
                                                    <h1 className="text-2xl md:text-3xl text-gray-800 dark:text-gray-100 font-bold">Dashboard</h1>
                                                </div>
                                                {/* Right: Actions */}
                                                <div className="grid grid-flow-col sm:auto-cols-max justify-start sm:justify-end gap-2">
                                                    {/* Add view button */}
                                                    <Link href={"/channels/onboarding"} className="btn bg-gray-900 text-gray-100 hover:bg-gray-800 dark:bg-gray-100 dark:text-gray-800 dark:hover:bg-white">
                                                        <svg className="fill-current shrink-0 xs:hidden" width="16" height="16" viewBox="0 0 16 16">
                                                            <path d="M15 7H9V1c0-.6-.4-1-1-1S7 .4 7 1v6H1c-.6 0-1 .4-1 1s.4 1 1 1h6v6c0 .6.4 1 1 1s1-.4 1-1V9h6c.6 0 1-.4 1-1s-.4-1-1-1z" />
                                                        </svg>
                                                        <span className="max-xs:sr-only">+ Add Channel</span>
                                                    </Link>
                                                </div>
                                            </div>
                                            <div className="grid grid-cols-6 gap-6 text-center">
                                                <AppIconCard/>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </main>

                        </div>

                    </div>
                </main>

            </div>

        </div>

    )
}
