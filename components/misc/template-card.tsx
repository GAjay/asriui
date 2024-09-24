import Image, {StaticImageData} from 'next/image'

interface Card {
    id: number,
    title:string,
    content: string,
    image: string | StaticImageData;
    tags:string[]
}

export default function TemplateCard({ data }: { data: Card }) {
    return (
        <>
            <td colSpan={10} className="px-2 first:pl-5 last:pr-5 py-3">
                <div className="flex items-center  p-3 -mt-3">
                    <div className="col-span-full sm:col-span-6 xl:col-span-4 bg-white dark:bg-gray-800 shadow-sm rounded-xl overflow-hidden">
                        <div className="flex flex-col h-full">
                            {/* Image */}
                            <div className="relative">
                                <Image className="w-full" src={data.image} width={286} height={160} alt="Application 05" />
                            </div>
                            {/* Card Content */}
                            <div className="grow flex flex-col p-5">
                                {/* Card body */}
                                <div className="grow">
                                    {/* Header */}
                                    <div className="flex items-center space-x-2 mr-2">
                                        {/* Rate */}
                                        {data?.tags?.map(item => {
                                            return(
                                                <div className="flex items-center space-x-2">
                                                    <div className="inline-flex text-sm font-medium bg-green-500/20 text-green-700 rounded-full text-center px-2 py-0.5">{item}</div>
                                                </div>
                                            )
                                        })}
                                    </div>

                                    <header className="mb-2">
                                        <h3 className="text-lg text-gray-800 dark:text-gray-100 font-semibold mb-1">{data?.title}</h3>
                                    </header>
                                    <div className="flex flex-wrap items-center justify-between">
                                        {/* Rating */}
                                        <div className="flex items-center space-x-2 mr-2">
                                            {/* Rate */}
                                            <div className="text-sm font-medium whitespace-nowrap">
                                                <span className="text-gray-400 dark:text-gray-500">by Keisha Singleton • Aug 22, 2024</span>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </td>
        </>
    )
}
