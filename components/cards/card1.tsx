import Image from 'next/image'
import Link from "next/link";
export default function Card1({ data }: { data: any[] }) {
    return (
        <>
            {data?.map(item => {
                return(

                        <div className="col-span-full md:col-span-6 xl:col-span-4 bg-white dark:bg-gray-800 shadow-sm rounded-xl overflow-hidden">
                            <Link href={'/channel/details'}>
                            <div className="flex flex-col h-full">
                                {/* Image */}
                                <div className="relative">
                                    <Image className="w-full" src={item.image} width={301} height={226} alt="Application 21" />
                                    {/* Like button */}
                                    <button className="absolute top-0 right-0 mt-4 mr-4">
                                        <div className="text-gray-100 bg-gray-900 bg-opacity-60 rounded-full">
                                            <span className="sr-only">Like</span>
                                            <svg className="h-8 w-8 fill-current" viewBox="0 0 32 32">
                                                <path d="M22.682 11.318A4.485 4.485 0 0019.5 10a4.377 4.377 0 00-3.5 1.707A4.383 4.383 0 0012.5 10a4.5 4.5 0 00-3.182 7.682L16 24l6.682-6.318a4.5 4.5 0 000-6.364zm-1.4 4.933L16 21.247l-5.285-5A2.5 2.5 0 0112.5 12c1.437 0 2.312.681 3.5 2.625C17.187 12.681 18.062 12 19.5 12a2.5 2.5 0 011.785 4.251h-.003z" />
                                            </svg>
                                        </div>
                                    </button>
                                    {/* Special Offer label */}
                                    {item?.has_offer ?
                                        <div className="absolute bottom-0 right-0 mb-4 mr-4">
                                            <div
                                                className="inline-flex items-center text-xs font-medium text-gray-100 dark:text-gray-300 bg-gray-900/60 dark:bg-gray-800/60 rounded-full text-center px-2 py-0.5">
                                                <svg className="w-3 h-3 shrink-0 fill-current text-yellow-500 mr-1"
                                                     viewBox="0 0 12 12">
                                                    <path
                                                        d="M11.953 4.29a.5.5 0 00-.454-.292H6.14L6.984.62A.5.5 0 006.12.173l-6 7a.5.5 0 00.379.825h5.359l-.844 3.38a.5.5 0 00.864.445l6-7a.5.5 0 00.075-.534z"/>
                                                </svg>
                                                <span>Special Offer</span>
                                            </div>
                                        </div>:<></>
                                    }
                                </div>
                                {/* Card Content */}
                                <div className="grow flex flex-col p-5">
                                    {/* Card body */}
                                    <div className="grow">
                                        <header className="mb-2">

                                                <h3 className="text-lg text-gray-800 dark:text-gray-100 font-semibold mb-1">{item?.title}</h3>

                                            <div className="text-sm">{item?.description}</div>
                                        </header>
                                    </div>
                                    {/* Rating and price */}
                                    <div className="flex flex-wrap justify-between items-center">
                                        {/* Rating */}
                                        <div className="flex items-center space-x-2 mr-2">
                                            {/* Stars */}
                                            <div className="flex space-x-1">
                                                <button>
                                                    <span className="sr-only">1 star</span>
                                                    <svg className="fill-current text-yellow-500" width="16" height="16" viewBox="0 0 16 16">
                                                        <path d="M10 5.934L8 0 6 5.934H0l4.89 3.954L2.968 16 8 12.223 13.032 16 11.11 9.888 16 5.934z" />
                                                    </svg>
                                                </button>
                                                <button>
                                                    <span className="sr-only">2 stars</span>
                                                    <svg className="fill-current text-yellow-500" width="16" height="16" viewBox="0 0 16 16">
                                                        <path d="M10 5.934L8 0 6 5.934H0l4.89 3.954L2.968 16 8 12.223 13.032 16 11.11 9.888 16 5.934z" />
                                                    </svg>
                                                </button>
                                                <button>
                                                    <span className="sr-only">3 stars</span>
                                                    <svg className="fill-current text-yellow-500" width="16" height="16" viewBox="0 0 16 16">
                                                        <path d="M10 5.934L8 0 6 5.934H0l4.89 3.954L2.968 16 8 12.223 13.032 16 11.11 9.888 16 5.934z" />
                                                    </svg>
                                                </button>
                                                <button>
                                                    <span className="sr-only">4 stars</span>
                                                    <svg className="fill-current text-yellow-500" width="16" height="16" viewBox="0 0 16 16">
                                                        <path d="M10 5.934L8 0 6 5.934H0l4.89 3.954L2.968 16 8 12.223 13.032 16 11.11 9.888 16 5.934z" />
                                                    </svg>
                                                </button>
                                                <button>
                                                    <span className="sr-only">5 stars</span>
                                                    <svg className="fill-current text-gray-300 dark:text-gray-600" width="16" height="16" viewBox="0 0 16 16">
                                                        <path d="M10 5.934L8 0 6 5.934H0l4.89 3.954L2.968 16 8 12.223 13.032 16 11.11 9.888 16 5.934z" />
                                                    </svg>
                                                </button>
                                            </div>
                                            {/* Rate */}
                                            <div className="inline-flex text-sm font-medium text-yellow-600"> {item?.rating}</div>
                                        </div>
                                        {/* Price */}
                                        {item?.has_offer ?
                                            <div>
                                                <div
                                                    className="inline-flex text-sm font-medium bg-red-500/20 text-red-700 rounded-full text-center px-2 py-0.5">$39.00
                                                </div>
                                            </div>
                                            :
                                            <div>
                                                <div
                                                    className="inline-flex text-sm font-medium bg-green-500/20 text-green-700 rounded-full text-center px-2 py-0.5">$69.00
                                                </div>
                                            </div>
                                        }
                                    </div>
                                </div>
                            </div>
                            </Link>
                        </div>
                )
            })}
        </>
    )
}
