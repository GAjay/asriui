export const metadata = {
    title: "Tell us what's your situation",
    description: 'Page description',
}

import Link from 'next/link'

export default function OnBoarding() {
    const workspace1 = [
        {name:'Courses', url:"/channels/1/workspace/course"},
        {name:'Chats', url:"/channels/1/workspace/chats"},
        {name:'Forum', url:"/channels/1/workspace/forums"},
        {name:'Video Calls', url:"/channels/1/workspace/video-calls"},
    ]
    return (
        <main className="dark:bg-gray-900 ">

            <div className="relative flex justify-center ">
                <div className="w-full bg-white text-center justify-center">

                    <div className="min-h-[90dvh] h-full flex flex-col after:flex-1">



                        <div className="px-4 py-8">
                            <div className="max-w-[96rem] mx-auto">
                                <h1 className="text-3xl text-gray-800 dark:text-gray-100 font-bold mb-6">Workspace</h1>
                                {/* Form */}
                                <form>
                                    <div className="sm:flex space-y-3 sm:space-y-0 sm:space-x-4 mb-8">
                                        {workspace1?.map(items => {
                                            return(
                                                <Link className="flex-1 relative block cursor-pointer" href={items?.url}>
                                                    <input type="radio" name="radio-buttons" className="peer sr-only" defaultChecked />
                                                    <div className="h-full text-center bg-white dark:bg-gray-800 px-4 py-6 rounded-lg border border-gray-200 dark:border-gray-700/60 hover:border-gray-300 dark:hover:border-gray-600 shadow-sm transition">
                                                        <svg
                                                            className="inline-flex fill-current text-violet-500 mt-2 mb-4"
                                                            xmlns="http://www.w3.org/2000/svg"
                                                            width={24}
                                                            height={24}
                                                            viewBox="0 0 24 24"
                                                        >
                                                            <path
                                                                d="M12 0C5.373 0 0 5.373 0 12s5.373 12 12 12 12-5.373 12-12S18.627 0 12 0ZM2 12C2 6.477 6.477 2 12 2s10 4.477 10 10a9.955 9.955 0 0 1-2.003 6.005 2 2 0 0 0-1.382-1.115l-3.293-.732-.295-1.178A4.992 4.992 0 0 0 17 11v-1a5 5 0 0 0-10 0v1c0 1.626.776 3.07 1.977 3.983l-.294 1.175-3.293.732a1.999 1.999 0 0 0-1.384 1.119A9.956 9.956 0 0 1 2 12Zm3.61 7.693A9.96 9.96 0 0 0 12 22c2.431 0 4.66-.868 6.393-2.31l-.212-.847-4.5-1-.496-1.984a5.016 5.016 0 0 1-2.365 0l-.496 1.983-4.5 1-.213.85ZM12 7a3 3 0 0 0-3 3v1a3 3 0 1 0 6 0v-1a3 3 0 0 0-3-3Z"
                                                                fillRule="evenodd"
                                                            />
                                                        </svg>
                                                        <div className="font-semibold text-gray-800 dark:text-gray-100 mb-1">{items?.name}</div>
                                                    </div>
                                                    <div className="absolute inset-0 border-2 border-transparent peer-checked:border-violet-400 dark:peer-checked:border-violet-500 rounded-lg pointer-events-none" aria-hidden="true"></div>
                                                </Link>
                                            )
                                        })}

                                    </div>

                                    <div className="sm:flex space-y-3 sm:space-y-0 sm:space-x-4 mb-8">
                                        <label className="flex-1 relative block cursor-pointer">
                                            <input type="radio" name="radio-buttons" className="peer sr-only" defaultChecked />
                                            <div className="h-full text-center bg-white dark:bg-gray-800 px-4 py-6 rounded-lg border border-gray-200 dark:border-gray-700/60 hover:border-gray-300 dark:hover:border-gray-600 shadow-sm transition">
                                                <svg
                                                    className="inline-flex fill-current text-violet-500 mt-2 mb-4"
                                                    xmlns="http://www.w3.org/2000/svg"
                                                    width={24}
                                                    height={24}
                                                    viewBox="0 0 24 24"
                                                >
                                                    <path
                                                        d="M12 0C5.373 0 0 5.373 0 12s5.373 12 12 12 12-5.373 12-12S18.627 0 12 0ZM2 12C2 6.477 6.477 2 12 2s10 4.477 10 10a9.955 9.955 0 0 1-2.003 6.005 2 2 0 0 0-1.382-1.115l-3.293-.732-.295-1.178A4.992 4.992 0 0 0 17 11v-1a5 5 0 0 0-10 0v1c0 1.626.776 3.07 1.977 3.983l-.294 1.175-3.293.732a1.999 1.999 0 0 0-1.384 1.119A9.956 9.956 0 0 1 2 12Zm3.61 7.693A9.96 9.96 0 0 0 12 22c2.431 0 4.66-.868 6.393-2.31l-.212-.847-4.5-1-.496-1.984a5.016 5.016 0 0 1-2.365 0l-.496 1.983-4.5 1-.213.85ZM12 7a3 3 0 0 0-3 3v1a3 3 0 1 0 6 0v-1a3 3 0 0 0-3-3Z"
                                                        fillRule="evenodd"
                                                    />
                                                </svg>
                                                <div className="font-semibold text-gray-800 dark:text-gray-100 mb-1">Trading</div>
                                            </div>
                                            <div className="absolute inset-0 border-2 border-transparent peer-checked:border-violet-400 dark:peer-checked:border-violet-500 rounded-lg pointer-events-none" aria-hidden="true"></div>
                                        </label>
                                        <label className="flex-1 relative block cursor-pointer">
                                            <input type="radio" name="radio-buttons" className="peer sr-only" />
                                            <div className="h-full text-center bg-white dark:bg-gray-800 px-4 py-6 rounded-lg border border-gray-200 dark:border-gray-700/60 hover:border-gray-300 dark:hover:border-gray-600 shadow-sm transition">
                                                <svg
                                                    className="inline-flex fill-current text-violet-500 mt-2 mb-4"
                                                    xmlns="http://www.w3.org/2000/svg"
                                                    width={24}
                                                    height={24}
                                                    viewBox="0 0 24 24"
                                                >
                                                    <path d="M13 22V11a3 3 0 0 1 3-3h5a3 3 0 0 1 3 3v13H0V14a3 3 0 0 1 3-3h5a3 3 0 0 1 3 3v8h2Zm6-15h-2V3a1 1 0 0 0-1-1H8a1 1 0 0 0-1 1v7H5V3a3 3 0 0 1 3-3h8a3 3 0 0 1 3 3v4ZM9 22v-8a1 1 0 0 0-1-1H3a1 1 0 0 0-1 1v8h7Zm13 0V11a1 1 0 0 0-1-1h-5a1 1 0 0 0-1 1v11h7Zm-5-8v-2h3v2h-3Zm0 3v-2h3v2h-3Zm0 3v-2h3v2h-3ZM4 20v-2h3v2H4Zm0-3v-2h3v2H4Z"/>
                                                </svg>
                                                <div className="font-semibold text-gray-800 dark:text-gray-100 mb-1">Editor</div>
                                            </div>
                                            <div className="absolute inset-0 border-2 border-transparent peer-checked:border-violet-400 dark:peer-checked:border-violet-500 rounded-lg pointer-events-none" aria-hidden="true"></div>
                                        </label>
                                        <label className="flex-1 relative block cursor-pointer">
                                            <input type="radio" name="radio-buttons" className="peer sr-only" />
                                            <div className="h-full text-center bg-white dark:bg-gray-800 px-4 py-6 rounded-lg border border-gray-200 dark:border-gray-700/60 hover:border-gray-300 dark:hover:border-gray-600 shadow-sm transition">
                                                <svg
                                                    className="inline-flex fill-current text-violet-500 mt-2 mb-4"
                                                    xmlns="http://www.w3.org/2000/svg"
                                                    width={24}
                                                    height={24}
                                                    viewBox="0 0 24 24"
                                                >
                                                    <path d="M13 22V11a3 3 0 0 1 3-3h5a3 3 0 0 1 3 3v13H0V14a3 3 0 0 1 3-3h5a3 3 0 0 1 3 3v8h2Zm6-15h-2V3a1 1 0 0 0-1-1H8a1 1 0 0 0-1 1v7H5V3a3 3 0 0 1 3-3h8a3 3 0 0 1 3 3v4ZM9 22v-8a1 1 0 0 0-1-1H3a1 1 0 0 0-1 1v8h7Zm13 0V11a1 1 0 0 0-1-1h-5a1 1 0 0 0-1 1v11h7Zm-5-8v-2h3v2h-3Zm0 3v-2h3v2h-3Zm0 3v-2h3v2h-3ZM4 20v-2h3v2H4Zm0-3v-2h3v2H4Z"/>
                                                </svg>
                                                <div className="font-semibold text-gray-800 dark:text-gray-100 mb-1">Video</div>
                                            </div>
                                            <div className="absolute inset-0 border-2 border-transparent peer-checked:border-violet-400 dark:peer-checked:border-violet-500 rounded-lg pointer-events-none" aria-hidden="true"></div>
                                        </label>

                                        <label className="flex-1 relative block cursor-pointer">
                                            <input type="radio" name="radio-buttons" className="peer sr-only" />
                                            <div className="h-full text-center bg-white dark:bg-gray-800 px-4 py-6 rounded-lg border border-gray-200 dark:border-gray-700/60 hover:border-gray-300 dark:hover:border-gray-600 shadow-sm transition">
                                                <svg
                                                    className="inline-flex fill-current text-violet-500 mt-2 mb-4"
                                                    xmlns="http://www.w3.org/2000/svg"
                                                    width={24}
                                                    height={24}
                                                    viewBox="0 0 24 24"
                                                >
                                                    <path d="M13 22V11a3 3 0 0 1 3-3h5a3 3 0 0 1 3 3v13H0V14a3 3 0 0 1 3-3h5a3 3 0 0 1 3 3v8h2Zm6-15h-2V3a1 1 0 0 0-1-1H8a1 1 0 0 0-1 1v7H5V3a3 3 0 0 1 3-3h8a3 3 0 0 1 3 3v4ZM9 22v-8a1 1 0 0 0-1-1H3a1 1 0 0 0-1 1v8h7Zm13 0V11a1 1 0 0 0-1-1h-5a1 1 0 0 0-1 1v11h7Zm-5-8v-2h3v2h-3Zm0 3v-2h3v2h-3Zm0 3v-2h3v2h-3ZM4 20v-2h3v2H4Zm0-3v-2h3v2H4Z"/>
                                                </svg>
                                                <div className="font-semibold text-gray-800 dark:text-gray-100 mb-1">Editor</div>
                                            </div>
                                            <div className="absolute inset-0 border-2 border-transparent peer-checked:border-violet-400 dark:peer-checked:border-violet-500 rounded-lg pointer-events-none" aria-hidden="true"></div>
                                        </label>
                                        <label className="flex-1 relative block cursor-pointer">
                                            <input type="radio" name="radio-buttons" className="peer sr-only" />
                                            <div className="h-full text-center bg-white dark:bg-gray-800 px-4 py-6 rounded-lg border border-gray-200 dark:border-gray-700/60 hover:border-gray-300 dark:hover:border-gray-600 shadow-sm transition">
                                                <svg
                                                    className="inline-flex fill-current text-violet-500 mt-2 mb-4"
                                                    xmlns="http://www.w3.org/2000/svg"
                                                    width={24}
                                                    height={24}
                                                    viewBox="0 0 24 24"
                                                >
                                                    <path d="M13 22V11a3 3 0 0 1 3-3h5a3 3 0 0 1 3 3v13H0V14a3 3 0 0 1 3-3h5a3 3 0 0 1 3 3v8h2Zm6-15h-2V3a1 1 0 0 0-1-1H8a1 1 0 0 0-1 1v7H5V3a3 3 0 0 1 3-3h8a3 3 0 0 1 3 3v4ZM9 22v-8a1 1 0 0 0-1-1H3a1 1 0 0 0-1 1v8h7Zm13 0V11a1 1 0 0 0-1-1h-5a1 1 0 0 0-1 1v11h7Zm-5-8v-2h3v2h-3Zm0 3v-2h3v2h-3Zm0 3v-2h3v2h-3ZM4 20v-2h3v2H4Zm0-3v-2h3v2H4Z"/>
                                                </svg>
                                                <div className="font-semibold text-gray-800 dark:text-gray-100 mb-1">Video</div>
                                            </div>
                                            <div className="absolute inset-0 border-2 border-transparent peer-checked:border-violet-400 dark:peer-checked:border-violet-500 rounded-lg pointer-events-none" aria-hidden="true"></div>
                                        </label>
                                    </div>

                                </form>

                            </div>
                        </div>

                    </div>

                </div>

            </div>

        </main>
    )
}
