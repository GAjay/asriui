'use client'

import {useState} from 'react'

export default function AccordionMenuBasic({
                                               children,
                                               title,
                                               is_completed
                                           }: {
    children: React.ReactNode
    title: string
    is_completed: boolean
}) {

    const [open, setOpen] = useState<boolean>(false)

    return (
        <div
            className="flex flex-nowrap overflow-x-scroll no-scrollbar md:block md:overflow-auto min-w-[15rem] md:space-y-3">
            <button
                className="flex items-center justify-between w-full group mb-1 border-b"
                aria-expanded={open}
                onClick={() => setOpen(!open)}
            >
                {is_completed?
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
                <div className="text-sm text-gray-800 dark:text-gray-100 font-medium">{title}</div>
                <svg
                    className={`w-8 h-8 shrink-0 fill-current text-gray-400 dark:text-gray-500 group-hover:text-gray-500 dark:group-hover:text-gray-400 ${open && 'rotate-180'}`}
                    viewBox="0 0 32 32">
                    <path d="M16 20l-5.4-5.4 1.4-1.4 4 4 4-4 1.4 1.4z"/>
                </svg>
            </button>
            <div className={`text-sm ${!open && 'hidden'}`}>
                {children}
            </div>
        </div>
    )
}
