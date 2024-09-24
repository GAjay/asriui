"use client";
import {useState} from "react";

import AppImage05 from '@/public/images/applications-image-05.jpg'
import AppImage06 from '@/public/images/applications-image-06.jpg'
import AppImage07 from '@/public/images/applications-image-07.jpg'
import AppImage21 from '@/public/images/applications-image-21.jpg'
import AppImage22 from '@/public/images/applications-image-22.jpg'
import AppImage23 from '@/public/images/applications-image-23.jpg'

import Card6 from "@/components/cards/card6";
import ModalBasic from "@/components/misc/modal-basic";



export default function Blog() {
    // const token = getCookie("session") as any;
    const blogs = [
        {
            id: 1,
            title: '50+ Best Business Ideas for Wom...',
            content: 'Women-owned businesses represent over 39% of all businesses - are you ready to join ...',
            image: AppImage06
        },
        {
            id: 2,
            title: 'How to Sell Courses on Udemy: A ...',
            content: 'With over 220,000 courses on Udemy, it’s no surprise that more and more instructors ...',
            image: AppImage05
        },
        {
            id: 3,
            title: 'Survey Junkie Review: Can You Re...',
            content: 'With zero set-up costs, minimal barriers to entry, and no special skills needed, ...',
            image: AppImage07
        },
        {
            id: 4,
            title: 'Survey Junkie Review: Can You Re...',
            content: 'With zero set-up costs, minimal barriers to entry, and no special skills needed, ...',
            image: AppImage06
        },
    ];

    // const [feedbackModalOpen, setFeedbackModalOpen] = useState()<boolean>(false)

    const [feedbackModalOpen, setFeedbackModalOpen] = useState<Boolean>(false);

    return (
        <>
            <section>
                <div className="px-4 sm:px-6 lg:px-8 py-8 md:py-0 w-full max-w-[96rem] mx-auto">

                    <div className="sm:flex sm:justify-between sm:items-center mt-8">
                        <div className="mb-4 sm:mb-0"><h1
                            className="text-2xl md:text-3xl text-gray-800 dark:text-gray-100 font-bold">Blogs</h1></div>
                            <div className="grid grid-flow-col sm:auto-cols-max justify-start sm:justify-end gap-2">



                            </div>
                        </div>
                    <div className="sm:flex sm:justify-between sm:items-center mb-8">
                        <div className="grid grid-cols-12 gap-6 mt-5">
                            {blogs.map(blog => (
                                <Card6
                                    key={blog.id}
                                    data={blog}/>
                            ))}
                        </div>
                    </div>
                </div>
            </section>
        </>
    );
}
