"use client";
import Footer from "@/components/ui/footer";
import Header from "@/components/ui/header";
import Card1 from "@/components/cards/card1";
import MobileMenu from "@/components/ui/mobile-menu";
import Filter from "@/components/cards/filter";
import RedeemNow from "@/components/cards/redeem-now";

import AppImage05 from '@/public/images/applications-image-05.jpg'
import AppImage06 from '@/public/images/applications-image-06.jpg'
import AppImage07 from '@/public/images/applications-image-07.jpg'
import AppImage21 from '@/public/images/applications-image-21.jpg'
import AppImage22 from '@/public/images/applications-image-22.jpg'
import AppImage23 from '@/public/images/applications-image-23.jpg'

import TestimonailCard from "@/components/cards/testimonials";
import Card2 from "@/components/cards/card2";
import Image from "next/image";

export default function Home() {
    // const token = getCookie("session") as any;
    const cardData = [
        {id:1, has_offer:true, title:"Form Builder CP 1", description:"Lorem ipsum dolor sit amet adipiscing elit, sed do eiusmod.",rating:3.7,price:"49.99$", image: AppImage21},
        {id:2,has_offer:false, title:"Form Builder CP 2", description:"Lorem ipsum dolor sit amet adipiscing elit, sed do eiusmod.",rating:4.7,price:"69.99$", image: AppImage22},
        {id:3, has_offer:true, title:"Form Builder CP 3", description:"Lorem ipsum dolor sit amet adipiscing elit, sed do eiusmod.",rating:2.5,price:"39.99$", image: AppImage23}
        ];
    const campaigns = [
        {
            id: 0,
            category: '1',
            content: 'Ben was a great help in helping me step by step navigate how to connect my discord. I thought I lost everything and he was able to patiently guide me and provide full support!! I suggest a pay increase for all of his patience and kindness.',
            dates: 'Jan 22',
            name:'Jennifer Robinson',
            rating: 3.5,
            initials: 'JR'
        },
        {
            id: 1,
            category: '2',
            content: 'Rob and Mason are kind person they both help me out how to cancel a membership that I was being charge for a month only which wasn’t a problem but I ain’t understand how to cancel and they both help me out thank your guys and thank you whop for having a chance with your guys on your website',
            dates: 'Aug 09',
            name:'Edgar Flores',
            rating: 4.5,
            initials: 'EF'
        },
        {
            id: 3,
            category: '3',
            content: 'I have recently set up a course on whop and time after time, any problem i have encountered, the Whop support team have been so helpful and resolved any help or questions straight away with a friendly mannor. I appreciate this beyond words.\n' +
                'Thank you Whop & a shoutout to Emma today for being so patient with me today!',
            dates: 'Aug 29',
            name:'Ryan Cruise',
            rating: 2.5,
            initials: 'RC'
        },
    ];
    const blogs = [
        {
            id: 1,
            title:'50+ Best Business Ideas for Wom...',
            content: 'Women-owned businesses represent over 39% of all businesses - are you ready to join them? Find over 50 business ideas in this ...',
            image: AppImage06
        },
        {
            id: 1,
            title:'How to Sell Courses on Udemy: A ...',
            content: 'With over 220,000 courses on Udemy, it’s no surprise that more and more instructors are flocking to the website. But how do you sell ...',
            image: AppImage05
        },
        {
            id: 1,
            title:'Survey Junkie Review: Can You Re...',
            content: 'With zero set-up costs, minimal barriers to entry, and no special skills needed, it\'s easy to see why people flock to paid online surveys ...',
            image: AppImage07
        },
    ];

    return (
        <>
            <Header/>
            <section>
                <div className="max-w-6xl mx-auto px-4 sm:px-6">
                    {/* Hero content */}
                    <div className=" pt-32 pb-10 md:pt-40 md:pb-16">
                        {/* Section header */}
                        <div className="max-w-3xl mx-auto text-center pb-12 md:pb-16">
                        </div>
                    </div>
                </div>
            </section>

            <section>
                <div className="max-w-6xl mx-auto px-4 sm:px-6">
                    {/* Filters */}
                    <Filter viewUrl={'/categories'}/>
                </div>
                {/* Cards*/}
                <div className="max-w-6xl mx-auto px-4 sm:px-6">
                    <div className="grid grid-cols-12 gap-6">
                        <Card1 data={cardData}/>
                    </div>
                </div>
            </section>

            <section>
                <div className="max-w-6xl mx-auto px-4 sm:px-6 mt-5">
                    {/* Redeem Now / Ads / Promo banners*/}
                    <RedeemNow/>
                </div>
            </section>

            <section>
                <div className="max-w-6xl mx-auto px-4 sm:px-6 mt-5">
                    <div className="sm:flex sm:justify-between sm:items-center ">
                        <nav className="mb-4 sm:mb-0 sm:order-1 pb-2" role="navigation" aria-label="Navigation">
                            <ul className="flex justify-center">
                                <li className="ml-3 first:ml-0">
                                    <a className="btn bg-white dark:bg-gray-800 border-gray-200 dark:border-gray-700/60 hover:border-gray-300 dark:hover:border-gray-600 text-gray-800 dark:text-gray-300" href="#">View All -&gt;</a>
                                </li>
                            </ul>
                        </nav>
                        <div className="sm:mb-0">
                            <h2 className="text-xl leading-snug text-gray-800 dark:text-gray-100 font-bold">What our users are saying</h2>
                        </div>
                    </div>
                </div>

                <div className="max-w-6xl mx-auto px-4 sm:px-6 mt-5">
                    <div className="grid grid-cols-12 gap-6">
                        {campaigns.map(campaign => (
                            <TestimonailCard
                                key={campaign.id}
                                testimonial={campaign} />
                        ))}
                    </div>
                </div>
            </section>

            <section>
                <div className="max-w-6xl mx-auto px-4 sm:px-6 mt-5">
                    <div className="grid grid-cols-12 gap-6 mt-5">
                        <div className="col-span-full sm:col-span-6 bg-white dark:bg-gray-800 shadow-sm rounded-xl overflow-hidden">
                            <div className="flex flex-col h-full">
                                {/* Image */}
                                <div className="relative">
                                    <Image className="w-full" src={AppImage21}   alt="Application 05" />
                                </div>
                            </div>
                        </div>
                        <div className="col-span-full sm:col-span-6 bg-white dark:bg-gray-800 shadow-sm rounded-xl overflow-hidden">
                            <div className="flex flex-col h-full">
                                {/* Image */}
                                <div className="relative">
                                    <Image className="w-full" src={AppImage22} alt="Application 05" />
                                </div>
                            </div>
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
                                    <a className="btn bg-white dark:bg-gray-800 border-gray-200 dark:border-gray-700/60 hover:border-gray-300 dark:hover:border-gray-600 text-gray-800 dark:text-gray-300" href="#">View All -&gt;</a>
                                </li>
                            </ul>
                        </nav>
                        <div className="sm:mb-0">
                            <h2 className="text-xl leading-snug text-gray-800 dark:text-gray-100 font-bold">Our Blogs</h2>
                        </div>
                    </div>
                    <div className="sm:flex sm:justify-between sm:items-center mb-8">
                        <div className="grid grid-cols-12 gap-6 mt-5">
                            {blogs.map(blog => (
                                <Card2
                                    key={blog.id}
                                    data={blog} />
                            ))}
                        </div>
                    </div>
                </div>
            </section>

            <section>
                <div className="max-w-6xl mx-auto px-4 sm:px-6 mt-5">
                    {/* Redeem Now / Ads / Promo banners*/}
                    <RedeemNow/>
                </div>
            </section>
            <Footer/>
        </>
    );
}
