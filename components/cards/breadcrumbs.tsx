import Link from "next/link";

export default function Breadcrumb({ breadcrumbs }: { breadcrumbs: any[] }) {
    return (
        <>
            <div className="mb-3">
                {breadcrumbs?.map((breadcrumb,i,row) => {
                    if (i + 1 === row.length) {
                        return(
                            <Link className="text-sm text-gray-500 dark:text-gray-400 italic font-bold mb-4" href=""> {breadcrumb} </Link>
                        )
                    } else {
                        return(
                            <Link className="text-sm text-gray-500 dark:text-gray-400 italic mb-4" href=""> {breadcrumb} /</Link>
                        )
                    }

                })}
            </div>
        </>
    )
}
