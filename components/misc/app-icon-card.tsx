import Image from 'next/image'
import Link from "next/link";
import AppImage13 from '@/public/images/applications-image-13.jpg'
import AppImage14 from '@/public/images/applications-image-14.jpg'
import AppImage15 from '@/public/images/applications-image-15.jpg'
import myLogo from '@/public/images/logo.png'
// import Logo from "@/components/ui/logo";

export default function AppIconCard() {
    return (
        <>
            {/* Card 1 */}
            <div className="col-span-full sm:col-span-6 xl:col-span-1 bg-white dark:bg-gray-800 shadow-sm rounded-xl overflow-hidden">
                <div className="flex flex-col h-full">
                    {/* Image */}
                    <div className="relative">
                        <Image className="w-full" src={myLogo} width={286} height={160} alt="Application 13" />
                        {/* Like button */}
                        <button className="absolute top-0 right-0 mt-4 mr-4">
                            <div className="text-gray-100 bg-gray-900 bg-opacity-60 rounded-full">
                                <span className="sr-only">Like</span>
                                <svg className="h-8 w-8 fill-current" viewBox="0 0 32 32">
                                    <path d="M22.682 11.318A4.485 4.485 0 0019.5 10a4.377 4.377 0 00-3.5 1.707A4.383 4.383 0 0012.5 10a4.5 4.5 0 00-3.182 7.682L16 24l6.682-6.318a4.5 4.5 0 000-6.364zm-1.4 4.933L16 21.247l-5.285-5A2.5 2.5 0 0112.5 12c1.437 0 2.312.681 3.5 2.625C17.187 12.681 18.062 12 19.5 12a2.5 2.5 0 011.785 4.251h-.003z" />
                                </svg>
                            </div>
                        </button>
                    </div>
                    {/* Card Content */}
                    <div className="grow flex flex-col p-5">
                        {/* Card body */}
                        <div className="grow">
                            {/* Header */}
                            <header className="mb-4">
                                <h3 className="text-lg text-gray-800 dark:text-gray-100 font-semibold mb-1">Trader Xm</h3>
                            </header>
                        </div>
                        {/* Card footer */}
                        <div>
                            <Link className="btn-sm w-full bg-gray-900 text-gray-100 hover:bg-gray-800 dark:bg-gray-100 dark:text-gray-800 dark:hover:bg-white" href="/channels/1/dashboard">Explore -&gt;</Link>
                        </div>
                    </div>
                </div>
            </div>

            {/* Card 1 */}
            <div className="col-span-full sm:col-span-6 xl:col-span-1 bg-white dark:bg-gray-800 shadow-sm rounded-xl overflow-hidden">
                <div className="flex flex-col h-full">
                    {/* Image */}
                    <div className="relative">
                        <Image className="w-full" src={myLogo}  alt="Application 13" />
                        {/* Like button */}
                        <button className="absolute top-0 right-0 mt-4 mr-4">
                            <div className="text-gray-100 bg-gray-900 bg-opacity-60 rounded-full">
                                <span className="sr-only">Like</span>
                                <svg className="h-8 w-8 fill-current" viewBox="0 0 32 32">
                                    <path d="M22.682 11.318A4.485 4.485 0 0019.5 10a4.377 4.377 0 00-3.5 1.707A4.383 4.383 0 0012.5 10a4.5 4.5 0 00-3.182 7.682L16 24l6.682-6.318a4.5 4.5 0 000-6.364zm-1.4 4.933L16 21.247l-5.285-5A2.5 2.5 0 0112.5 12c1.437 0 2.312.681 3.5 2.625C17.187 12.681 18.062 12 19.5 12a2.5 2.5 0 011.785 4.251h-.003z" />
                                </svg>
                            </div>
                        </button>
                    </div>
                    {/* Card Content */}
                    <div className="grow flex flex-col p-5">
                        {/* Card body */}
                        <div className="grow">
                            {/* Header */}
                            <header className="mb-4">
                                <h3 className="text-lg text-gray-800 dark:text-gray-100 font-semibold mb-1">Trader Xm</h3>
                            </header>
                        </div>
                        {/* Card footer */}
                        <div>
                            <Link className="btn-sm w-full bg-gray-900 text-gray-100 hover:bg-gray-800 dark:bg-gray-100 dark:text-gray-800 dark:hover:bg-white" href="/channels/1/dashboard">Explore -&gt;</Link>
                            {/*<span className="text-sm font-medium text-violet-500 hover:text-violet-600 dark:hover:text-violet-400" href="#">Explore -&gt;</span>*/}
                        </div>
                    </div>
                </div>
            </div>

            {/* Card 1 */}
            <div className="col-span-full sm:col-span-6 xl:col-span-1 bg-white dark:bg-gray-800 shadow-sm rounded-xl overflow-hidden">
                <div className="flex flex-col h-full">
                    {/* Image */}
                    <div className="relative">
                        <Image className="w-full" src={myLogo} width={286} height={160} alt="Application 13" />
                        {/* Like button */}
                        <button className="absolute top-0 right-0 mt-4 mr-4">
                            <div className="text-gray-100 bg-gray-900 bg-opacity-60 rounded-full">
                                <span className="sr-only">Like</span>
                                <svg className="h-8 w-8 fill-current" viewBox="0 0 32 32">
                                    <path d="M22.682 11.318A4.485 4.485 0 0019.5 10a4.377 4.377 0 00-3.5 1.707A4.383 4.383 0 0012.5 10a4.5 4.5 0 00-3.182 7.682L16 24l6.682-6.318a4.5 4.5 0 000-6.364zm-1.4 4.933L16 21.247l-5.285-5A2.5 2.5 0 0112.5 12c1.437 0 2.312.681 3.5 2.625C17.187 12.681 18.062 12 19.5 12a2.5 2.5 0 011.785 4.251h-.003z" />
                                </svg>
                            </div>
                        </button>
                    </div>
                    {/* Card Content */}
                    <div className="grow flex flex-col p-5">
                        {/* Card body */}
                        <div className="grow">
                            {/* Header */}
                            <header className="mb-4">
                                <h3 className="text-lg text-gray-800 dark:text-gray-100 font-semibold mb-1">Trader Xm</h3>
                            </header>
                        </div>
                        {/* Card footer */}
                        <div>
                            <a className="btn-sm w-full bg-gray-900 text-gray-100 hover:bg-gray-800 dark:bg-gray-100 dark:text-gray-800 dark:hover:bg-white" href="/channels/2/dashboard">Explore -&gt;</a>
                            {/*<span className="text-sm font-medium text-violet-500 hover:text-violet-600 dark:hover:text-violet-400" href="#">Explore -&gt;</span>*/}
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}
