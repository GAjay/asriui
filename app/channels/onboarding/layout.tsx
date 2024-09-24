import Sidebar from '@/components/ui/auth-sidebar'
import Header from '@/components/ui/auth-header'
import ChannelSidebar from "@/components/ui/auth-sidebar";

export default function DefaultLayout({children,}: {
    children: React.ReactNode
}) {
    return (
        <div className="flex h-[100dvh] overflow-hidden">


            {/* Sidebar */}
            {/*<ChannelSidebar />*/}
            <Sidebar />
            {/* Content area */}
            <div className="relative flex flex-col flex-1 overflow-y-auto overflow-x-hidden">

                {/*  Site header */}
                <Header />

                <main className="grow [&>*:first-child]:scroll-mt-16">
                    {children}
                </main>

            </div>

        </div>
    )
}
