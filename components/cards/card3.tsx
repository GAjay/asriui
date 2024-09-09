import Link from 'next/link'
import Image, {StaticImageData} from 'next/image'

interface Card {
    id: number,
    title:string,
    content: string,
    rating: number,
    image: string | StaticImageData,
    price:string
}

export default function Card3({ data }: { data: Card }){
    return (
        <>
            <ul>
                {/* Cart item */}
                <li className="sm:flex items-center py-6 border-b border-gray-200 dark:border-gray-700/60">
                    <a className="block mb-4 sm:mb-0 mr-5 md:w-32 xl:w-auto shrink-0" href="#0">
                        <Image className="rounded-sm" src={data.image} width={200} height={142} alt="Product 01" />
                    </a>
                    <div className="grow">
                        <a href="#0">
                            <h3 className="text-lg font-semibold text-gray-800 dark:text-gray-100 mb-1">{data.title} </h3>
                        </a>
                        <div className="text-sm mb-2">{data.content} </div>
                        {/* Product meta */}
                        <div className="flex flex-wrap justify-between items-center">
                            {/* Rating and price */}
                            <div className="flex flex-wrap items-center space-x-2 mr-2">
                                {/* Rating */}
                                <div className="flex items-center space-x-2">
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
                                    <div className="inline-flex text-sm font-medium text-yellow-600">4{data.rating} </div>
                                </div>
                                <div className="text-gray-400 dark:text-gray-600">·</div>
                                {/* Price */}
                                <div>
                                    <div className="inline-flex text-sm font-medium bg-green-500/20 text-green-700 rounded-full text-center px-2 py-0.5">${data.price} </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </li>
            </ul>
        </>
    )
}
