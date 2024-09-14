import Sidebar from '@/components/ui/auth-workspace-sidebar'
import Header from '@/components/ui/auth-header'

export default function AlternativeLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <div className="flex h-[100dvh] overflow-hidden">

      {/* Sidebar */}
      <Sidebar variant="v2" />

      {/* Content area */}
      <div className="relative flex flex-col flex-1 overflow-y-auto overflow-x-hidden">

        {/*  Site header */}
        <Header variant="v2" />

        <main className="grow [&>*:first-child]:scroll-mt-16">
          {children}
        </main>

      </div>

    </div>
  )
}
