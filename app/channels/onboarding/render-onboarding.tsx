'use client'

import {useState} from "react";
import OnboardingProgress from "@/app/channels/onboarding/onboarding-progress";
import Link from "next/link";

export default function RenderOnBoarding() {
    const [page, setPage] = useState(1);

    const renderOnBoarding = () => {
        switch (page) {
            case 1:
                return (
                    <div className="w-full md:w-1/2 bg-white text-center justify-center">

                        <div className="min-h-[90dvh] h-full flex flex-col after:flex-1">

                            <div className="flex-2">
                                <OnboardingProgress step={1}/>
                            </div>

                            <div className="px-4 py-8">
                                <div className="max-w-md mx-auto">

                                    <h1 className="text-3xl text-gray-800 dark:text-gray-100 font-bold mb-6">Channel information</h1>
                                    {/* htmlForm */}
                                    <form>
                                        <div className="space-y-4 mb-8">
                                            {/* Company Name */}
                                            <div>
                                                <label className="block text-sm font-medium mb-1" htmlFor="company-name">Channel Name <span className="text-red-500">*</span></label>
                                                <input id="company-name" className="form-input w-full" type="text" />
                                            </div>

                                        </div>
                                        <div className="flex items-center justify-between">
                                            <button className="btn bg-gray-900 text-gray-100 hover:bg-gray-800 dark:bg-gray-100 dark:text-gray-800 dark:hover:bg-white ml-auto" onClick={() => setPage(page + 1)}>Next -&gt;</button>
                                        </div>
                                    </form>

                                </div>
                            </div>

                        </div>

                    </div>
                );
            case 2:
                return (
                    <div className="w-full md:w-1/2 bg-white text-center justify-center">

                        <div className="min-h-[90dvh] h-full flex flex-col after:flex-1">

                            <div className="flex-1">
                                <OnboardingProgress step={2} />
                            </div>

                            <div className="px-4 py-8">
                                <div className="max-w-md mx-auto">
                                    <h1 className="text-3xl text-gray-800 dark:text-gray-100 font-bold mb-6">Select your category</h1>
                                    {/* Form */}
                                    <form>
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

                                        </div>

                                        <div className="flex items-center justify-between">
                                            <button className="text-sm underline hover:no-underline" onClick={() => setPage(page - 1)}>&lt;- Previous</button>
                                            <button className="btn bg-gray-900 text-gray-100 hover:bg-gray-800 dark:bg-gray-100 dark:text-gray-800 dark:hover:bg-white ml-auto" onClick={() => setPage(page + 1)}>Next -&gt;</button>
                                        </div>
                                    </form>

                                </div>
                            </div>

                        </div>

                    </div>
                );
            case 3:
                return (
                    <div className="w-full md:w-1/2 bg-white text-center justify-center">

                        <div className="min-h-[90dvh] h-full flex flex-col after:flex-1">

                            <div className="flex-1">
                                <OnboardingProgress step={3} />
                            </div>

                            <div className="px-4 py-8">
                                <div className="max-w-md mx-auto">

                                    <div className="text-center">
                                        <svg className="inline-flex w-16 h-16 fill-current mb-6" viewBox="0 0 64 64">
                                            <circle className="text-green-500/20" cx="32" cy="32" r="32" />
                                            <path className="text-green-700" d="M37.22 26.375a1 1 0 1 1 1.56 1.25l-8 10a1 1 0 0 1-1.487.082l-4-4a1 1 0 0 1 1.414-1.414l3.21 3.21 7.302-9.128Z" />
                                        </svg>
                                        <h1 className="text-3xl text-gray-800 dark:text-gray-100 font-bold mb-8">Channel Created Successfully 🙌</h1>
                                        <Link className="btn bg-gray-900 text-gray-100 hover:bg-gray-800 dark:bg-gray-100 dark:text-gray-800 dark:hover:bg-white" href="/channels">Go To Channels -&gt;</Link>
                                    </div>

                                </div>
                            </div>



                        </div>

                    </div>
                );

            default:
                return (
                    <div className="w-full md:w-1/2 bg-white text-center justify-center">

                        <div className="min-h-[90dvh] h-full flex flex-col after:flex-1">

                            <div className="flex-2">
                                <OnboardingProgress step={1}/>
                            </div>

                            <div className="px-4 py-8">
                                <div className="max-w-md mx-auto">

                                    <h1 className="text-3xl text-gray-800 dark:text-gray-100 font-bold mb-6">Channel information</h1>
                                    {/* htmlForm */}
                                    <form>
                                        <div className="space-y-4 mb-8">
                                            {/* Company Name */}
                                            <div>
                                                <label className="block text-sm font-medium mb-1" htmlFor="company-name">Channel Name <span className="text-red-500">*</span></label>
                                                <input id="company-name" className="form-input w-full" type="text" />
                                            </div>

                                        </div>
                                        <div className="flex items-center justify-between">
                                            <button className="btn bg-gray-900 text-gray-100 hover:bg-gray-800 dark:bg-gray-100 dark:text-gray-800 dark:hover:bg-white ml-auto" onClick={() => setPage(page + 1)}>Next -&gt;</button>
                                        </div>
                                    </form>

                                </div>
                            </div>

                        </div>

                    </div>
                );
        }
    };
    return (
        <>
        {renderOnBoarding()}
        </>
    )
}
