"use client";
import Footer from "@/components/ui/footer";
import Header from "@/components/ui/header";


import AppImage05 from '@/public/images/applications-image-05.jpg'
import AppImage06 from '@/public/images/applications-image-06.jpg'
import AppImage07 from '@/public/images/applications-image-07.jpg'
import AppImage21 from '@/public/images/applications-image-21.jpg'
import AppImage22 from '@/public/images/applications-image-22.jpg'
import AppImage23 from '@/public/images/applications-image-23.jpg'

import TestimonailCard from "@/components/cards/testimonials";
import Card2 from "@/components/cards/card2";
import Image from "next/image";
import Card4 from "@/components/cards/card4";
import Card5 from "@/components/cards/card5";

export default function Home() {
    // const token = getCookie("session") as any;
    const blogs = [
        {
            id: 1,
            title: '50+ Best Business Ideas for Wom...',
            content: 'Women-owned businesses represent over 39% of all businesses - are you ready to join them? Find over 50 business ideas in this ...',
            image: AppImage06
        },
        {
            id: 2,
            title: 'How to Sell Courses on Udemy: A ...',
            content: 'With over 220,000 courses on Udemy, it’s no surprise that more and more instructors are flocking to the website. But how do you sell ...',
            image: AppImage05
        },
        {
            id: 3,
            title: 'Survey Junkie Review: Can You Re...',
            content: 'With zero set-up costs, minimal barriers to entry, and no special skills needed, it\'s easy to see why people flock to paid online surveys ...',
            image: AppImage07
        },
    ];
    const blogs1 = [
        {
            id: 1,
            title: '50+ Best Business Ideas for Wom...',
            content: 'Women-owned businesses represent over 39% of all businesses - are you ready to join them? Find over 50 business ideas in this ...',
            image: AppImage21
        },
        {
            id: 2,
            title: 'How to Sell Courses on Udemy: A ...',
            content: 'With over 220,000 courses on Udemy, it’s no surprise that more and more instructors are flocking to the website. But how do you sell ...',
            image: AppImage22
        },
        {
            id: 3,
            title: 'Survey Junkie Review: Can You Re...',
            content: 'With zero set-up costs, minimal barriers to entry, and no special skills needed, it\'s easy to see why people flock to paid online surveys ...',
            image: AppImage23
        },
    ];

    return (
        <>
            <Header/>


            <section>
                <div className="max-w-6xl mx-auto px-4 sm:px-6 mt-5">
                    <div className="sm:flex sm:justify-between sm:items-center ">
                        <nav className="mb-4 sm:mb-0 sm:order-1 pb-2" role="navigation" aria-label="Navigation">
                            <ul className="flex justify-center">
                                <li className="ml-3 first:ml-0">
                                    <a className="btn bg-white dark:bg-gray-800 border-gray-200 dark:border-gray-700/60 hover:border-gray-300 dark:hover:border-gray-600 text-gray-800 dark:text-gray-300"
                                       href="#">View All -&gt;</a>
                                </li>
                            </ul>
                        </nav>
                        <div className="sm:mb-0">
                            <h2 className="text-xl leading-snug text-gray-800 dark:text-gray-100 font-bold">Our
                                Blogs</h2>
                        </div>
                    </div>
                    <div className="sm:flex sm:justify-between sm:items-center mb-8">
                        <div className="grid grid-cols-12 gap-6 mt-5">
                            {blogs.map(blog => (
                                <Card2
                                    key={blog.id}
                                    data={blog}/>
                            ))}
                            {blogs1.map(blog => (
                                <Card2
                                    key={blog.id}
                                    data={blog}/>
                            ))}
                        </div>
                    </div>
                </div>
            </section>
            <section>
                <div className="max-w-6xl mx-auto px-4 sm:px-6 mt-5">
                    <div className="sm:flex sm:justify-between sm:items-center ">
                        <nav className="mb-4 sm:mb-0 sm:order-1 pb-2" role="navigation" aria-label="Navigation">
                            <ul className="flex justify-center">
                                <li className="ml-3 first:ml-0">
                                    <a className="btn bg-white dark:bg-gray-800 border-gray-200 dark:border-gray-700/60 hover:border-gray-300 dark:hover:border-gray-600 text-gray-800 dark:text-gray-300"
                                       href="#">View All -&gt;</a>
                                </li>
                            </ul>
                        </nav>
                        <div className="sm:mb-0">
                            <h2 className="text-xl leading-snug text-gray-800 dark:text-gray-100 font-bold">ECommerce</h2>
                        </div>
                    </div>
                    <div className="sm:flex sm:justify-between sm:items-center mb-8">
                        <div className="grid grid-cols-12 gap-6 mt-5">
                            {blogs.map(blog => (
                                <Card4
                                    key={blog.id}
                                    data={blog}/>
                            ))}
                        </div>
                    </div>
                </div>
            </section>
            <section>
                <div className="max-w-6xl mx-auto px-4 sm:px-6 mt-5">
                    <div className="sm:flex sm:justify-between sm:items-center ">
                        <nav className="mb-4 sm:mb-0 sm:order-1 pb-2" role="navigation" aria-label="Navigation">
                            <ul className="flex justify-center">
                                <li className="ml-3 first:ml-0">
                                    <a className="btn bg-white dark:bg-gray-800 border-gray-200 dark:border-gray-700/60 hover:border-gray-300 dark:hover:border-gray-600 text-gray-800 dark:text-gray-300"
                                       href="#">View All -&gt;</a>
                                </li>
                            </ul>
                        </nav>
                        <div className="sm:mb-0">
                            <h2 className="text-xl leading-snug text-gray-800 dark:text-gray-100 font-bold">Recent</h2>
                        </div>
                    </div>
                    <div className="sm:flex sm:justify-between sm:items-center mb-8">
                        <div className="grid grid-cols-12 gap-6 mt-5">
                            {blogs1.map(blog => (
                                <Card5
                                    key={blog.id}
                                    data={blog}/>
                            ))}
                            {blogs.map(blog => (
                                <Card5
                                    key={blog.id}
                                    data={blog}/>
                            ))}
                            {blogs1.map(blog => (
                                <Card5
                                    key={blog.id}
                                    data={blog}/>
                            ))}
                        </div>
                    </div>
                </div>
            </section>

            <Footer/>
        </>
    );
}
