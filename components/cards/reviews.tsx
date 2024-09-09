import Link from "next/link";
import Image from "next/image";

interface Card {
    id: number,
    name:string,
    content: string,
    rating: string,
    image: string,
}

export default function Review({ data }: { data: Card }) {
    return (
        <>
            <li>
                <div className="flex items-center mb-2">
                    <Image className="w-8 h-8 rounded-full mr-3" src={data.image} width={32} height={32} alt="User 07" />
                    <div>
                        <div className="text-sm font-semibold text-gray-800 dark:text-gray-100 mb-1">{data.name}</div>
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
                            <div className="inline-flex text-sm font-medium text-yellow-600">{data.rating}</div>
                        </div>
                    </div>
                </div>
                <div className="text-sm italic">“{data.content}”</div>
            </li>
        </>
    )
}
