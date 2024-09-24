'use client'

import Link from 'next/link'
import {usePathname} from 'next/navigation'
import AccordionMenuBasic from "@/components/misc/accordion-menu-basic";
import {StaticImageData} from "next/image";

// interface Menu {
//     chapter: string,
//     is_completed:boolean,
//     submenu: [],
//     title: string;
// }

export default function CourseSidebar({ menu }: { menu: any[] }) {
    const pathname = usePathname()
    return (
        <div
            className="flex flex-nowrap overflow-x-scroll no-scrollbar md:block md:overflow-auto px-3 py-6 border-b md:border-b-0 md:border-r border-gray-200 dark:border-gray-700/60 min-w-[15rem] md:space-y-3">
            {/* Group 1 */}
            {menu?.map(item => {
                return (
                    <AccordionMenuBasic title={item?.chapter} is_completed={item?.is_completed}>

                        <ul className="flex justify-start w-full group mb-1 md:block mr-3 md:mr-0">
                            {item?.submenu?.map(submenu => {
                                return (
                                    <Link href="/workspace/1/course" >
                                    <li className="flex items-center justify-start w-full group mb-1 border-b">

                                        {submenu?.is_completed?
                                            <svg width="20" height="20" fill="currentColor"
                                                 className="bi bi-check-circle-fill text-green-500" viewBox="0 0 16 16">
                                                <path
                                                    d="M16 8A8 8 0 1 1 0 8a8 8 0 0 1 16 0m-3.97-3.03a.75.75 0 0 0-1.08.022L7.477 9.417 5.384 7.323a.75.75 0 0 0-1.06 1.06L6.97 11.03a.75.75 0 0 0 1.079-.02l3.992-4.99a.75.75 0 0 0-.01-1.05z"/>
                                            </svg>
                                            :
                                            <svg width="20" height="20" fill="currentColor"
                                                 className="bi bi-circle text-gray-500" viewBox="0 0 16 16">
                                                <path d="M8 15A7 7 0 1 1 8 1a7 7 0 0 1 0 14m0 1A8 8 0 1 0 8 0a8 8 0 0 0 0 16"/>
                                            </svg>
                                        }
                                        <span
                                            className={`flex items-center px-2.5 py-2 rounded-lg whitespace-nowrap ${pathname.includes('/settings/account') && 'bg-[linear-gradient(135deg,var(--tw-gradient-stops))] from-violet-500/[0.12] dark:from-violet-500/[0.24] to-violet-500/[0.04]'}`}>
                                            <span
                                                className={`text-sm font-medium ${pathname.includes('/settings/account') ? 'text-violet-500 dark:text-violet-400' : 'text-gray-600 dark:text-gray-300 hover:text-gray-700 dark:hover:text-gray-200'}`}>{submenu?.title}</span>
                                        </span>

                                    </li>
                                    </Link>
                                )}
                            )}
                        </ul>
                    </AccordionMenuBasic>
                )
            })}
        </div>
    )
}
