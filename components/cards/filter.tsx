
export default function Filter({viewUrl}) {
    return (
        <>
            {/* Filter */}
            <div className="mb-4 border-b border-gray-200 dark:border-gray-700/60">
                <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between">
                    <nav className="mb-4 sm:mb-0 sm:order-1 pb-2" role="navigation" aria-label="Navigation">
                        <ul className="flex justify-center">
                            <li className="ml-3 first:ml-0">
                                <a className="btn bg-white dark:bg-gray-800 border-gray-200 dark:border-gray-700/60 hover:border-gray-300 dark:hover:border-gray-600 text-gray-800 dark:text-gray-300" href={viewUrl? viewUrl : ""}>View All -&gt;</a>
                            </li>
                        </ul>
                    </nav>
                    <div className="text-sm text-gray-500 text-center sm:text-left">
                        <ul className="text-sm font-medium flex flex-nowrap -mx-4 sm:-mx-6 lg:-mx-8 overflow-x-scroll no-scrollbar">
                            <li className="pb-3 mr-6 last:mr-0 first:pl-4 sm:first:pl-6 lg:first:pl-8 last:pr-4 sm:last:pr-6 lg:last:pr-8">
                                <a className="text-violet-500 whitespace-nowrap" href="#0">View All</a>
                            </li>
                            <li className="pb-3 mr-6 last:mr-0 first:pl-4 sm:first:pl-6 lg:first:pl-8 last:pr-4 sm:last:pr-6 lg:last:pr-8">
                                <a className="text-gray-500 dark:text-gray-400 hover:text-gray-600 dark:hover:text-gray-300 whitespace-nowrap"
                                   href="#">Courses</a>
                            </li>
                            <li className="pb-3 mr-6 last:mr-0 first:pl-4 sm:first:pl-6 lg:first:pl-8 last:pr-4 sm:last:pr-6 lg:last:pr-8">
                                <a className="text-gray-500 dark:text-gray-400 hover:text-gray-600 dark:hover:text-gray-300 whitespace-nowrap"
                                   href="#">Digital Goods</a>
                            </li>
                            <li className="pb-3 mr-6 last:mr-0 first:pl-4 sm:first:pl-6 lg:first:pl-8 last:pr-4 sm:last:pr-6 lg:last:pr-8">
                                <a className="text-gray-500 dark:text-gray-400 hover:text-gray-600 dark:hover:text-gray-300 whitespace-nowrap"
                                   href="#">Online Events</a>
                            </li>
                            <li className="pb-3 mr-6 last:mr-0 first:pl-4 sm:first:pl-6 lg:first:pl-8 last:pr-4 sm:last:pr-6 lg:last:pr-8">
                                <a className="text-gray-500 dark:text-gray-400 hover:text-gray-600 dark:hover:text-gray-300 whitespace-nowrap"
                                   href="#">Crowdfunding</a>
                            </li>
                        </ul>
                    </div>
                </div>
            </div>
        </>
    )
}
