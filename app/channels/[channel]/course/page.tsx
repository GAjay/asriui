export const metadata = {
    title: 'Feedback Settings - Mosaic',
    description: 'Page description',
}

import SettingsSidebar from './course-sidebar'
import CoursePanel from './course-panel'

export default function FeedbackSettings() {
    const courseMenu =  [
        {chapter : "Introduction To Trading",  submenu :
            [
                {
                    "title": "Welcome To ASFX", "video_url": "", is_completed:true
                },
                {
                    "title": "Title 1", "video_url": "", is_completed:true
                },
                {
                    "title": "Title 2", "video_url": "", is_completed:true
                },
            ],
            is_completed:true
        },
        {chapter : "Chapter 1",  submenu :
            [
                {
                    "title": "1.1 Welcome To ASFX 1", "video_url": "", is_completed:true
                },
                {
                    "title": "1.2 Title 1", "video_url": "", is_completed:true
                },
                {
                    "title": "1.3 Title 2", "video_url": "", is_completed:false
                },
            ],
            is_completed:false
        },
        {chapter : "Chapter 2",  submenu :
            [
                {
                    "title": "2.1 Welcome To ASFX 2", "video_url": "", is_completed:false
                },
                    {
                        "title": "2.2 Title 4", "video_url": "", is_completed:false
                    },
                    {
                        "title": "2.3 Title 5", "video_url": "", is_completed:false
                    },
                ],
            is_completed:false
        }
    ];
    return (
        <div className="px-4 sm:px-6 lg:px-8 py-8 w-full max-w-[96rem] mx-auto">

            {/* Page header */}
            <div className="mb-8">
                {/* Title */}
                <h1 className="text-2xl md:text-3xl text-gray-800 dark:text-gray-100 font-bold">Course Title</h1>
            </div>

            {/* Content */}
            <div className="bg-white dark:bg-gray-800 shadow-sm rounded-xl mb-8">
                <div className="flex flex-col md:flex-row md:-mr-px">

                    <SettingsSidebar menu={courseMenu}/>
                    <CoursePanel />

                </div>
            </div>

        </div>
    )
}
