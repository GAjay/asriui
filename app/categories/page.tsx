"use client";
import Footer from "@/components/ui/footer";
import Header from "@/components/ui/header";

import Related01 from '@/public/images/related-product-01.jpg'
import Related02 from '@/public/images/related-product-02.jpg'
import Related03 from '@/public/images/related-product-03.jpg'

import ChannelSidebar from "@/components/cards/channel-sidebar";
import Filter2 from "@/components/cards/filter2";
import Card3 from "@/components/cards/card3";
import Paginate from "@/components/cards/paginate";

export default function Home() {

    const channels = [
        {
            id: 1,
            title:'50+ Best Business Ideas for Wom...',
            content: 'Women-owned businesses represent over 39% of all businesses - are you ready to join them? Find over 50 business ideas in this ...',
            image: Related01,
            rating:4.5,
            price: "49.00"
        },
        {
            id: 2,
            title:'How to Sell Courses on Udemy: A ...',
            content: 'With over 220,000 courses on Udemy, it’s no surprise that more and more instructors are flocking to the website. But how do you sell ...',
            image: Related02,
            rating:4.7,
            price: "99.00"
        },
        {
            id: 3,
            title:'Survey Junkie Review: Can You Re...',
            content: 'With zero set-up costs, minimal barriers to entry, and no special skills needed, it\'s easy to see why people flock to paid online surveys ...',
            image: Related03,
            rating:4.3,
            price: "59.00"
        },
    ];

    return (
        <>
            <Header/>

            <section>
                <div className="max-w-6xl mx-auto px-4 sm:px-6 mt-5">
                    {/* Page header */}
                    <div className="mb-5">

                        {/* Title */}
                        <h1 className="text-2xl md:text-3xl text-gray-800 dark:text-gray-100 font-bold">Find the right product for you</h1>

                    </div>

                    {/* Page content */}
                    <div className="flex flex-col space-y-10 sm:flex-row sm:space-x-6 sm:space-y-0 md:flex-col md:space-x-0 md:space-y-10 xl:flex-row xl:space-x-6 xl:space-y-0 mt-9">
                        <ChannelSidebar/>

                        <div>
                            <Filter2/>

                            {channels.map(channel => (
                                <Card3
                                    key={channel.id}
                                    data={channel} />
                            ))}

                            <div className="mt-8">
                                <Paginate />
                            </div>

                        </div>


                    </div>
                </div>
            </section>






            <Footer/>
        </>
    );
}
