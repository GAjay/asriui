import Header from "@/components/ui/header";

export const metadata = {
    title: 'Product - Mosaic',
    description: 'Page description',
}

import Link from 'next/link'
import Image from 'next/image'
import ProductImage from '@/public/images/product-image.jpg'
import Footer from "@/components/ui/footer";
import Breadcrumb from "@/components/cards/breadcrumbs";

import Review from "@/components/cards/reviews";
import Card1 from "@/components/cards/card1";

import AppImage21 from "@/public/images/applications-image-21.jpg";
import AppImage22 from "@/public/images/applications-image-22.jpg";
import AppImage23 from "@/public/images/applications-image-23.jpg";
import User07 from "@/public/images/user-32-07.jpg";
import User05 from "@/public/images/user-32-05.jpg";
import User03 from "@/public/images/user-32-03.jpg";
import User04 from "@/public/images/user-32-04.jpg";
import Card2 from "@/components/cards/card2";

export default function ChannelDetails() {
    const breadcrumbs = ["Home", "Channels", "Details"];

    const channels  = [
        {id:1, has_offer:true, title:"Form Builder CP 1", description:"Lorem ipsum dolor sit amet adipiscing elit, sed do eiusmod.",rating:3.7,price:"49.99$", image: AppImage21},
        {id:2,has_offer:false, title:"Form Builder CP 2", description:"Lorem ipsum dolor sit amet adipiscing elit, sed do eiusmod.",rating:4.7,price:"69.99$", image: AppImage22},
        {id:3, has_offer:true, title:"Form Builder CP 3", description:"Lorem ipsum dolor sit amet adipiscing elit, sed do eiusmod.",rating:2.5,price:"39.99$", image: AppImage23}
    ];
    const reviews  = [
        {id:1, name:"Danielle Mark", content:"Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam.",rating:3.7, image: User07},
        {id:2, name:"Marija Urkjulz", content:"Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam.",rating:4.7, image: User03},
        {id:3, name:"Rodrigo Pantoja", content:"Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam.",rating:4.5, image: User04},
        {id:4, name:"Juan Johnson", content:"Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam.",rating:4.9, image: User05},
    ];
    return (
        <>
            <Header/>

            <div className="max-w-6xl mx-auto px-4 sm:px-6 mt-5">
                <div className="max-w-5xl mx-auto flex flex-col lg:flex-row lg:space-x-8 xl:space-x-16">

                    {/* Content */}
                    <div>
                        <Breadcrumb breadcrumbs={breadcrumbs}/>
                        <header className="mb-4">
                            {/* Title */}
                            <h1 className="text-2xl md:text-3xl text-gray-800 dark:text-gray-100 font-bold mb-2">Front-End Learning: Hands-On HTML & CSS In Real Web Apps</h1>
                            <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua ut enim ad minim veniam.</p>
                        </header>

                        {/* Meta */}
                        <div className="space-y-3 sm:flex sm:items-center sm:justify-between sm:space-y-0 mb-6">
                            {/* Author */}
                            <div className="flex items-center sm:mr-4">
                                <Link className="block mr-2 shrink-0" href="#0">
                                    <Image className="rounded-full" src={User07} width={32} height={32} alt="User 04" />
                                </Link>
                                <Link className="block text-sm font-semibold text-gray-800 dark:text-gray-100 whitespace-nowrap" href="#0">
                                    Simona Lürwer
                                </Link>
                            </div>
                            {/* Right side */}
                            <div className="flex flex-wrap items-center sm:justify-end space-x-4">
                                {/* Tag */}
                                <div className="inline-flex items-center text-xs font-medium text-gray-100 dark:text-gray-300 bg-gray-900/60 dark:bg-gray-800/60 rounded-full text-center px-2 py-0.5">
                                    <svg className="w-3 h-3 shrink-0 fill-current text-yellow-500 mr-1" viewBox="0 0 12 12">
                                        <path d="M11.953 4.29a.5.5 0 00-.454-.292H6.14L6.984.62A.5.5 0 006.12.173l-6 7a.5.5 0 00.379.825h5.359l-.844 3.38a.5.5 0 00.864.445l6-7a.5.5 0 00.075-.534z" />
                                    </svg>
                                    <span>Special Offer</span>
                                </div>
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
                                    <div className="inline-flex text-sm font-medium text-yellow-600">4.2</div>
                                </div>
                            </div>
                        </div>

                        {/* Image */}
                        <figure className="mb-6">
                            <Image className="w-full rounded-sm" src={ProductImage} width="640" height="360" alt="Product" />
                        </figure>

                        {/* Product content */}
                        <div>
                            <h2 className="text-xl leading-snug text-gray-800 dark:text-gray-100 font-bold mb-2">Overview</h2>
                            <p className="mb-6">Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua u t enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.</p>
                            <p className="mb-6">Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.</p>
                            <ul className="list-disc list-inside space-y-1 mb-6">
                                <li>E-commerce: Better lorem ipsum generator.</li>
                                <li>Booking: Lorem ipsum post generator.</li>
                                <li>Retail: Better lorem ipsum generator.</li>
                                <li>Services: Better lorem ipsum generator.</li>
                            </ul>
                            <blockquote className="italic mb-6">
                                “Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.”
                            </blockquote>
                        </div>

                        <hr className="my-6 border-t border-gray-100 dark:border-gray-700/60" />
                        <div className="mb-3">
                            {/* Reviews */}
                            <div>
                                <h2 className="text-xl leading-snug text-gray-800 dark:text-gray-100 font-bold mb-2">Featured Reviews (44)</h2>
                                <ul className="space-y-5 my-6">
                                    {/*<Review />*/}
                                    {reviews?.map(review => {
                                        return(
                                            <Review data={review} />
                                        )
                                    })}

                                </ul>
                                {/* Load More */}
                                <div className="text-center">
                                    <button className="btn bg-white dark:bg-gray-800 border-gray-200 dark:border-gray-700/60 hover:border-gray-300 dark:hover:border-gray-600 text-gray-800 dark:text-gray-300">Load More Reviews</button>
                                </div>
                            </div>
                        </div>

                        <hr className="my-6 border-t border-gray-100 dark:border-gray-700/60" />

                    </div>

                    {/* Sidebar */}
                    <div>
                        <div className="bg-white dark:bg-gray-800 p-5 shadow-sm rounded-xl lg:w-[18rem] xl:w-[20rem]">
                            <div className="text-sm text-gray-800 dark:text-gray-100 font-semibold mb-3">Select a Package</div>
                            <ul className="space-y-2 sm:flex sm:space-y-0 sm:space-x-2 lg:space-y-2 lg:space-x-0 lg:flex-col mb-4">
                                <li>
                                    <button className="w-full h-full text-left py-3 px-4 rounded-lg bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700/60 hover:border-gray-300 dark:hover:border-gray-600 shadow-sm transition">
                                        <div className="flex flex-wrap items-center justify-between mb-0.5">
                                            <span className="font-semibold text-gray-800 dark:text-gray-100">Essential</span>
                                            <span className="font-medium text-green-600">$39.00</span>
                                        </div>
                                        <div className="text-sm">Lorem ipsum dolor sit amet elit sed do eiusmod.</div>
                                    </button>
                                </li>
                                <li>
                                    <button className="w-full h-full text-left py-3 px-4 rounded-lg bg-white dark:bg-gray-800 border-2 border-violet-400 dark:border-violet-500 shadow-sm transition">
                                        <div className="flex flex-wrap items-center justify-between mb-0.5">
                                            <span className="font-semibold text-gray-800 dark:text-gray-100">Premium <span className="text-xs italic text-violet-500 align-top">Best Value</span></span>
                                            <span className="font-medium text-green-600">$69.00</span>
                                        </div>
                                        <div className="text-sm">Lorem ipsum dolor sit amet elit sed do eiusmod.</div>
                                    </button>
                                </li>
                                <li>
                                    <button className="w-full h-full text-left py-3 px-4 rounded-lg bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700/60 hover:border-gray-300 dark:hover:border-gray-600 shadow-sm transition">
                                        <div className="flex flex-wrap items-center justify-between mb-0.5">
                                            <span className="font-semibold text-gray-800 dark:text-gray-100">Complete</span>
                                            <span className="font-medium text-green-600">$89.00</span>
                                        </div>
                                        <div className="text-sm">Lorem ipsum dolor sit amet elit sed do eiusmod.</div>
                                    </button>
                                </li>
                            </ul>
                            <div className="mb-4">
                                <Link className="btn w-full bg-gray-900 text-gray-100 hover:bg-gray-800 dark:bg-gray-100 dark:text-gray-800 dark:hover:bg-white" href="#0">Buy Now - $69.00</Link>
                            </div>
                        </div>
                    </div>

                </div>
            </div>

            <section>
                <div className="max-w-6xl mx-auto px-4 sm:px-6 mt-5">
                    <div className="sm:flex sm:justify-between sm:items-center ">
                        <nav className="mb-4 sm:mb-0 sm:order-1 pb-2" role="navigation" aria-label="Navigation">
                            <ul className="flex justify-center">
                                <li className="ml-3 first:ml-0">
                                    <Link className="btn bg-white dark:bg-gray-800 border-gray-200 dark:border-gray-700/60 hover:border-gray-300 dark:hover:border-gray-600 text-gray-800 dark:text-gray-300" href="#">View All -&gt;</Link>
                                </li>
                            </ul>
                        </nav>
                        <div className="sm:mb-0">
                            <h2 className="text-xl leading-snug text-gray-800 dark:text-gray-100 font-bold">Frequently Bought Together</h2>
                        </div>
                    </div>
                    <div className="sm:flex sm:justify-between sm:items-center mb-8">
                        <div className="grid grid-cols-12 gap-6 mt-5">
                            <Card1 data={channels}/>
                        </div>
                    </div>
                </div>
            </section>
            <Footer/>
        </>
    )
}
