import Link from 'next/link'
import Image, { StaticImageData } from 'next/image'
import { CampaignProperties } from './campaigns-properties'

interface Testimonials {
    id: number
    category: string
    name: string
    content: string
    rating: number
    dates:string
}

export default function TestimonailCard({ testimonial }: { testimonial: Testimonials }) {

    const {
        typeColor,
        categoryIcon,
    } = CampaignProperties()

    return (
        <div className="col-span-full sm:col-span-6 xl:col-span-4 bg-white dark:bg-gray-800 shadow-sm rounded-xl">
            <div className="flex flex-col h-full p-5">
                <header>
                    <div className="flex items-center justify-between">
                        <div className="flex shrink-0 -space-x-3 -ml-px">
                            {categoryIcon(testimonial.category)}
                            <span className="mt-2">{testimonial.name}</span>
                        </div>

                        <div className="flex shrink-0 -space-x-3 -ml-px">
                            <div className="text-sm font-medium text-gray-500 mb-2">{testimonial.dates}</div>
                        </div>
                    </div>
                </header>
                <div className="grow mt-2">

                    <div className="text-sm">{testimonial.content}</div>
                </div>
                <footer className="mt-5">
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
                        <div className="inline-flex text-sm font-medium text-yellow-600">{testimonial.rating}</div>
                    </div>
                </footer>
            </div>
        </div>
    )
}
