import YoutubeEmbed from "@/components/misc/yt";

export default function CoursePanel() {
  return (
    <div className="grow">

      {/* Panel body */}
      <div className="p-6 space-y-6">
        <div>
          <div className="text-sm">Introduction</div>
          <div>
            <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between">
              <nav className="mb-4 sm:mb-0 sm:order-1" role="navigation" aria-label="Navigation">
                <ul className="flex justify-center">
                  <li className="ml-3 first:ml-0"><span
                      className="btn bg-white dark:bg-gray-800 border-gray-200 dark:border-gray-700/60 text-gray-300 dark:text-gray-600">&lt;- Previous</span>
                  </li>
                  <li className="ml-3 first:ml-0"><a
                      className="btn bg-white dark:bg-gray-800 border-gray-200 dark:border-gray-700/60 hover:border-gray-300 dark:hover:border-gray-600 text-gray-800 dark:text-gray-300"
                      href="#0">Next -&gt;</a></li>
                  <div className="ml-3 first:ml-0">
                    <button
                        className="btn bg-white dark:bg-gray-800 border-gray-200 dark:border-gray-700/60 hover:border-gray-300 dark:hover:border-gray-600 text-green-500">
                      <svg width="20" height="20" fill="currentColor"
                           className="bi bi-check-all text-green-500" viewBox="0 0 16 16">
                        <path
                            d="M8.97 4.97a.75.75 0 0 1 1.07 1.05l-3.99 4.99a.75.75 0 0 1-1.08.02L2.324 8.384a.75.75 0 1 1 1.06-1.06l2.094 2.093L8.95 4.992zm-.92 5.14.92.92a.75.75 0 0 0 1.079-.02l3.992-4.99a.75.75 0 1 0-1.091-1.028L9.477 9.417l-.485-.486z"/>
                      </svg>
                      <span className="ml-2">Completed</span></button>
                  </div>
                </ul>
              </nav>
              <h2 className="text-2xl text-gray-800 dark:text-gray-100 font-bold mb-4 mt-5">Welcome To ASFX</h2>
            </div>
          </div>
        </div>

        {/* Rate */}
        <section>

        </section>

        {/* Tell us in words */}
        <section>
          <div className="w-full">
            <YoutubeEmbed embedId="rokGy0huYEA" />
          </div>
        </section>
      </div>

    </div>
  )
}
