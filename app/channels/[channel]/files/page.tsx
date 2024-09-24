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
import Image from "next/image";



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
                            className="text-2xl md:text-3xl text-gray-800 dark:text-gray-100 font-bold">Files</h1></div>
                        <div className="grid grid-flow-col sm:auto-cols-max justify-start sm:justify-end gap-2">
                        </div>
                    </div>
                    <div className="sm:flex sm:justify-between sm:items-center mb-8">
                        <div className="grid grid-cols-12 gap-6 mt-5">
                            <div className="col-span-full sm:col-span-6 xl:col-span-3 bg-white dark:bg-gray-800 shadow-sm rounded-xl overflow-hidden">
                                <div className="flex flex-col h-full">
                                    {/* Image */}
                                    <div className="relative">
                                        {/*<Image className="w-full" src={data?.image} width={286} height={160} alt="Application 05" />*/}
                                        <svg  width="100" height="100"
                                             fill="currentColor" className="bi bi-file-earmark-binary w-full mt-5"
                                             viewBox="0 0 16 16">
                                            <path
                                                d="M7.05 11.885c0 1.415-.548 2.206-1.524 2.206C4.548 14.09 4 13.3 4 11.885c0-1.412.548-2.203 1.526-2.203.976 0 1.524.79 1.524 2.203m-1.524-1.612c-.542 0-.832.563-.832 1.612q0 .133.006.252l1.559-1.143c-.126-.474-.375-.72-.733-.72zm-.732 2.508c.126.472.372.718.732.718.54 0 .83-.563.83-1.614q0-.129-.006-.25zm6.061.624V14h-3v-.595h1.181V10.5h-.05l-1.136.747v-.688l1.19-.786h.69v3.633z"/>
                                            <path
                                                d="M14 14V4.5L9.5 0H4a2 2 0 0 0-2 2v12a2 2 0 0 0 2 2h8a2 2 0 0 0 2-2M9.5 3A1.5 1.5 0 0 0 11 4.5h2V14a1 1 0 0 1-1 1H4a1 1 0 0 1-1-1V2a1 1 0 0 1 1-1h5.5z"/>
                                        </svg>
                                    </div>
                                    {/* Card Content */}
                                    <div className="grow flex flex-col p-3">
                                        {/* Card body */}
                                        <div className="grow">
                                            {/* Header */}
                                            <header className="mb-2">
                                                <div className="text-sm">filename.png</div>
                                                <div className="text-sm font-bold">filename.png title</div>
                                            </header>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <div className="col-span-full sm:col-span-6 xl:col-span-3 bg-white dark:bg-gray-800 shadow-sm rounded-xl overflow-hidden">
                                <div className="flex flex-col h-full">
                                    {/* Image */}
                                    <div className="relative">
                                        {/*<Image className="w-full" src={data?.image} width={286} height={160} alt="Application 05" />*/}
                                        <svg  width="100" height="100"
                                              fill="currentColor" className="bi bi-file-earmark-binary w-full mt-5"
                                              viewBox="0 0 16 16">
                                            <path
                                                d="M7.05 11.885c0 1.415-.548 2.206-1.524 2.206C4.548 14.09 4 13.3 4 11.885c0-1.412.548-2.203 1.526-2.203.976 0 1.524.79 1.524 2.203m-1.524-1.612c-.542 0-.832.563-.832 1.612q0 .133.006.252l1.559-1.143c-.126-.474-.375-.72-.733-.72zm-.732 2.508c.126.472.372.718.732.718.54 0 .83-.563.83-1.614q0-.129-.006-.25zm6.061.624V14h-3v-.595h1.181V10.5h-.05l-1.136.747v-.688l1.19-.786h.69v3.633z"/>
                                            <path
                                                d="M14 14V4.5L9.5 0H4a2 2 0 0 0-2 2v12a2 2 0 0 0 2 2h8a2 2 0 0 0 2-2M9.5 3A1.5 1.5 0 0 0 11 4.5h2V14a1 1 0 0 1-1 1H4a1 1 0 0 1-1-1V2a1 1 0 0 1 1-1h5.5z"/>
                                        </svg>
                                    </div>
                                    {/* Card Content */}
                                    <div className="grow flex flex-col p-3">
                                        {/* Card body */}
                                        <div className="grow">
                                            {/* Header */}
                                            <header className="mb-2">
                                                <div className="text-sm">filename.png</div>
                                                <div className="text-sm font-bold">filename.png title</div>
                                            </header>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </section>
        </>
    );
}
