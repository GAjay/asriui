import Image from 'next/image'

interface Card {
    id: number,
    title:string,
    content: string,
    rating: string,
    image: string
}

export default function Card2({ data }: { data: Card }) {
    return (
        <>
            {/* Card 1 */}
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
                            <header className="mb-2">
                                <h3 className="text-lg text-gray-800 dark:text-gray-100 font-semibold mb-1">{data?.title}</h3>
                                <div className="text-sm">{data?.content}</div>
                            </header>
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}
