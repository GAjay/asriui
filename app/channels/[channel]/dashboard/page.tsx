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
                                <h1 className="text-3xl text-gray-800 dark:text-gray-100 font-bold mb-6">Dashboard</h1>


                            </div>
                        </div>

                    </div>

                </div>

            </div>

        </main>
    )
}
