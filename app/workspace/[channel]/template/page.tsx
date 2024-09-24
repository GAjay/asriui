export const metadata = {
    title: 'Accordion - Mosaic',
    description: 'Page description',
}

import AccordionTableItem from '@/components/misc/accordion-template-item'
import Image01 from '@/public/images/user-40-07.jpg'

export default function Template() {

    // Some dummy data
    const items = [
        {
            id: 0,
            image: Image01,
            customer: 'Mark Cameron',
            total: '$129.00',
            status: 'Refunded',
            items: 1,
            location: '🇲🇽 New Mexico, MX',
            type: 'Subscription',
            description: 'Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.'
        },
    ]

    return (
        <div className="relative  dark:bg-gray-900 h-full">
            <div className="px-4 sm:px-6 lg:px-8 py-8 w-full max-w-[96rem] mx-auto">

                {/* Page header */}
                <div className="mb-8">
                    <h1 className="text-2xl md:text-3xl text-gray-800 dark:text-gray-100 font-bold">Templates</h1>
                </div>

                <div>

                    {/* Components */}
                    <div className="space-y-8 mt-8">


                        {/* Table Row with Accordion */}
                        <div>
                            {/* Start */}
                            <div className="rounded-lg border border-gray-200 dark:border-gray-700/60">
                                <div className="overflow-x-auto">
                                    <table className="table-auto w-full dark:text-gray-300 divide-y divide-gray-100 dark:divide-gray-700/60">
                                        {items.map(item => (
                                            <AccordionTableItem key={item.id} item={item} />
                                        ))}
                                    </table>
                                </div>
                            </div>
                            {/* End */}
                        </div>


                    </div>

                </div>

            </div>
        </div>
    )
}
