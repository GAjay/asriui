'use client'
import Review from "@/components/cards/reviews";
import {useState} from "react";
import User07 from "@/public/images/user-32-07.jpg";
import User03 from "@/public/images/user-32-03.jpg";
import User04 from "@/public/images/user-32-04.jpg";
import User05 from "@/public/images/user-32-05.jpg";

export default function ReviewFaqs() {

    const [filter, setFilter] = useState('review');

    const reviews  = [
        {id:1, name:"Danielle Mark", content:"Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam.",rating:3.7, image: User07},
        {id:2, name:"Marija Urkjulz", content:"Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam.",rating:4.7, image: User03},
        {id:3, name:"Rodrigo Pantoja", content:"Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam.",rating:4.5, image: User04},
        {id:4, name:"Juan Johnson", content:"Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam.",rating:4.9, image: User05},
    ];

    return (
        <>

            <div className="mb-8 border-b border-gray-200 dark:border-gray-700/60">
                <ul className="text-sm font-medium flex flex-nowrap -mx-4 sm:-mx-6 lg:-mx-8 overflow-x-scroll no-scrollbar">
                    <li className="pb-3 mr-6 last:mr-0 first:pl-4 sm:first:pl-6 lg:first:pl-8 last:pr-4 sm:last:pr-6 lg:last:pr-8">
                        <button className={filter=='review' ? 'text-violet-500 whitespace-nowrap': 'text-gray-500 dark:text-gray-400 hover:text-gray-600 dark:hover:text-gray-300 whitespace-nowrap'} onClick={()=> setFilter('review')}>Featured Reviews</button>
                    </li>
                    <li className="pb-3 mr-6 last:mr-0 first:pl-4 sm:first:pl-6 lg:first:pl-8 last:pr-4 sm:last:pr-6 lg:last:pr-8">
                        <button className={filter=='faqs' ? 'text-violet-500 whitespace-nowrap': 'text-gray-500 dark:text-gray-400 hover:text-gray-600 dark:hover:text-gray-300 whitespace-nowrap'} onClick={()=> setFilter('faqs')}>Faqs</button>
                    </li>
                </ul>
            </div>

            {filter=='review' ?
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
                :<></>
            }


            {filter=='faqs' ?
                <div className="mb-3">
                    <h2 className="text-2xl text-gray-800 dark:text-gray-100 font-bold mb-4">FAQS</h2>
                    {/* Post */}
                    <article className="py-4 border-b border-gray-200 dark:border-gray-700/60">
                        <header className="flex items-start mb-2">
                            <div className="mt-2 mr-3">
                                <svg className="shrink-0 fill-current" width="16" height="16" viewBox="0 0 16 16">
                                    <path className="text-violet-300" d="M4 8H0v4.9c0 1 .7 1.9 1.7 2.1 1.2.2 2.3-.8 2.3-2V8z" />
                                    <path className="text-violet-500" d="M15 1H7c-.6 0-1 .4-1 1v11c0 .7-.2 1.4-.6 2H13c1.7 0 3-1.3 3-3V2c0-.6-.4-1-1-1z" />
                                </svg>
                            </div>
                            <h3 className="text-xl leading-snug text-gray-800 dark:text-gray-100 font-bold">How can the widget to my website?</h3>
                        </header>
                        <div className="pl-7">
                            <div className="mb-2">Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua ut enim ad minim veniam, quis nostrud exercitation ullamco.</div>
                        </div>
                    </article>
                    {/* Post */}
                    <article className="py-4 border-b border-gray-200 dark:border-gray-700/60">
                        <header className="flex items-start mb-2">
                            <div className="mt-2 mr-3">
                                <svg className="shrink-0 fill-current" width="16" height="16" viewBox="0 0 16 16">
                                    <path className="text-violet-300" d="M4 8H0v4.9c0 1 .7 1.9 1.7 2.1 1.2.2 2.3-.8 2.3-2V8z" />
                                    <path className="text-violet-500" d="M15 1H7c-.6 0-1 .4-1 1v11c0 .7-.2 1.4-.6 2H13c1.7 0 3-1.3 3-3V2c0-.6-.4-1-1-1z" />
                                </svg>
                            </div>
                            <h3 className="text-xl leading-snug text-gray-800 dark:text-gray-100 font-bold">What would happen if I choose not to pay after the usage?</h3>
                        </header>
                        <div className="pl-7">
                            <div className="mb-2">Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua ut enim ad minim veniam, quis nostrud exercitation ullamco.</div>
                        </div>
                    </article>
                    {/* Post */}
                    <article className="py-4 border-b border-gray-200 dark:border-gray-700/60">
                    <header className="flex items-start mb-2">
                        <div className="mt-2 mr-3">
                            <svg className="shrink-0 fill-current" width="16" height="16" viewBox="0 0 16 16">
                                <path className="text-violet-300" d="M4 8H0v4.9c0 1 .7 1.9 1.7 2.1 1.2.2 2.3-.8 2.3-2V8z" />
                                <path className="text-violet-500" d="M15 1H7c-.6 0-1 .4-1 1v11c0 .7-.2 1.4-.6 2H13c1.7 0 3-1.3 3-3V2c0-.6-.4-1-1-1z" />
                            </svg>
                        </div>
                        <h3 className="text-xl leading-snug text-gray-800 dark:text-gray-100 font-bold">What limitations do trial accounts have?</h3>
                    </header>
                    <div className="pl-7">
                        <div className="mb-2">Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua ut enim ad minim veniam, quis nostrud exercitation ullamco.</div>
                    </div>
                </article>
                    {/* Load More */}
                    <div className="text-center mt-5">
                        <button className="btn bg-white dark:bg-gray-800 border-gray-200 dark:border-gray-700/60 hover:border-gray-300 dark:hover:border-gray-600 text-gray-800 dark:text-gray-300">Load More Reviews</button>
                    </div>
                </div>
                :<></>
            }
        </>
    )
}
