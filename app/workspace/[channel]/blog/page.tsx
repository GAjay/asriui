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

    const [feedbackModalOpen, setFeedbackModalOpen] = useState<boolean>(false);

    return (
        <>


            <section>

                <div className="px-4 sm:px-6 lg:px-8 py-8 md:py-0 w-full max-w-[96rem] mx-auto">

                    <div className="sm:flex sm:justify-between sm:items-center mt-8">
                        <div className="mb-4 sm:mb-0"><h1
                            className="text-2xl md:text-3xl text-gray-800 dark:text-gray-100 font-bold">Blogs</h1></div>
                            <div className="grid grid-flow-col sm:auto-cols-max justify-start sm:justify-end gap-2">
                                <button className="btn bg-gray-900 text-gray-100 hover:bg-gray-800 dark:bg-gray-100 dark:text-gray-800 dark:hover:bg-white" onClick={() => { setFeedbackModalOpen(true) }}>
                                    <svg className="fill-current shrink-0 xs:hidden" width="16" height="16" viewBox="0 0 16 16">
                                        <path
                                            d="M15 7H9V1c0-.6-.4-1-1-1S7 .4 7 1v6H1c-.6 0-1 .4-1 1s.4 1 1 1h6v6c0 .6.4 1 1 1s1-.4 1-1V9h6c.6 0 1-.4 1-1s-.4-1-1-1z"></path>
                                    </svg>
                                    <span className="max-xs:sr-only">Add Blog</span>
                                </button>

                                <ModalBasic isOpen={feedbackModalOpen} setIsOpen={setFeedbackModalOpen} title="Create Blog">
                                    {/* Modal content */}
                                    <div className="px-5 py-4">
                                        <div className="text-sm">
                                            <div className="font-medium text-gray-800 dark:text-gray-100 mb-3">Let us create a blog 🙌</div>
                                        </div>
                                        <div className="space-y-3">
                                            <div>
                                                <label className="block text-sm font-medium mb-1" htmlFor="name">Title <span className="text-red-500">*</span></label>
                                                <input id="name" className="form-input w-full px-2 py-1" type="text" required />
                                            </div>
                                            <div>
                                                <label className="block text-sm font-medium mb-1" htmlFor="feedback">Description <span className="text-red-500">*</span></label>
                                                <textarea id="feedback" className="form-textarea w-full px-2 py-1" rows={4} required></textarea>
                                            </div>
                                        </div>
                                    </div>
                                    {/* Modal footer */}
                                    <div className="px-5 py-4 border-t border-gray-200 dark:border-gray-700/60">
                                        <div className="flex flex-wrap justify-end space-x-2">
                                            <button className="btn-sm border-gray-200 dark:border-gray-700/60 hover:border-gray-300 dark:hover:border-gray-600 text-gray-800 dark:text-gray-300" onClick={() => { setFeedbackModalOpen(false) }}>Cancel</button>
                                            <button className="btn-sm bg-gray-900 text-gray-100 hover:bg-gray-800 dark:bg-gray-100 dark:text-gray-800 dark:hover:bg-white">Send</button>
                                        </div>
                                    </div>
                                </ModalBasic>
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
