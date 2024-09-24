export default function AppsPanel() {
  const apps = [
    {name:'Chats', icon:'bg-violet-500', is_installed:true, downloads:'4k', rating:'4.7', description:'Lorem ipsum dolor sit amet eiusmod sed do eiusmod tempor.'},
    {name:'Forums', icon:'bg-sky-500', is_installed:true, downloads:'3k', rating:'4.5', description:'Lorem ipsum dolor sit amet eiusmod sed do eiusmod tempor.'},
    {name:'Video Call', icon:'bg-green-500', is_installed:true, downloads:'1k', rating:'4.6', description:'Lorem ipsum dolor sit amet eiusmod sed do eiusmod tempor.'},
    {name:'Courses', icon:'bg-red-500', is_installed:false, downloads:'2k', rating:'4.2', description:'Lorem ipsum dolor sit amet eiusmod sed do eiusmod tempor.'},
    {name:'Embeds', icon:'bg-yellow-500', is_installed:true, downloads:'500', rating:'3.7', description:'Lorem ipsum dolor sit amet eiusmod sed do eiusmod tempor.'},
    {name:'Posts', icon:'bg-gray-400', is_installed:false, downloads:'10k', rating:'3.5', description:'Lorem ipsum dolor sit amet eiusmod sed do eiusmod tempor.'}
  ];
  return (
    <div className="grow">

      {/* Panel body */}
      <div className="p-6">
        {/*<h2 className="text-2xl text-gray-800 dark:text-gray-100 font-bold mb-5">Connected Apps</h2>*/}

        {/* General */}
        <div className="mb-6">
           {/*Filters*/}
          <div className="sm:flex sm:justify-between sm:items-center mb-5">
            <div className="mb-4 sm:mb-0">
              <ul className="flex flex-wrap -m-1">
                <li className="m-1">
                  <button
                      className="inline-flex items-center justify-center text-sm font-medium leading-5 rounded-full px-3 py-1 border border-transparent shadow-sm bg-gray-900 dark:bg-gray-100 text-white dark:text-gray-800 transition">All <span
                      className="ml-1 text-gray-400 dark:text-gray-500">67</span></button>
                </li>
                <li className="m-1">
                  <button
                      className="inline-flex items-center justify-center text-sm font-medium leading-5 rounded-full px-3 py-1 border border-gray-200 dark:border-gray-700/60 hover:border-gray-300 dark:hover:border-gray-600 shadow-sm bg-white dark:bg-gray-800 text-gray-500 dark:text-gray-400 transition">Paid <span
                      className="ml-1 text-gray-400 dark:text-gray-500">14</span></button>
                </li>
                <li className="m-1">
                  <button
                      className="inline-flex items-center justify-center text-sm font-medium leading-5 rounded-full px-3 py-1 border border-gray-200 dark:border-gray-700/60 hover:border-gray-300 dark:hover:border-gray-600 shadow-sm bg-white dark:bg-gray-800 text-gray-500 dark:text-gray-400 transition">Due <span
                      className="ml-1 text-gray-400 dark:text-gray-500">34</span></button>
                </li>
                <li className="m-1">
                  <button
                      className="inline-flex items-center justify-center text-sm font-medium leading-5 rounded-full px-3 py-1 border border-gray-200 dark:border-gray-700/60 hover:border-gray-300 dark:hover:border-gray-600 shadow-sm bg-white dark:bg-gray-800 text-gray-500 dark:text-gray-400 transition">Overdue <span
                      className="ml-1 text-gray-400 dark:text-gray-500">19</span></button>
                </li>
              </ul>
            </div>
            <div className="grid grid-flow-col sm:auto-cols-max justify-start sm:justify-end gap-2">
              <div className="hidden">
                <div className="flex items-center">
                  <div className="hidden xl:block text-sm italic mr-2 whitespace-nowrap"><span>0</span> items selected
                  </div>
                  <button
                      className="btn bg-white dark:bg-gray-800 border-gray-200 dark:border-gray-700/60 hover:border-gray-300 dark:hover:border-gray-600 text-red-500">Delete
                  </button>
                </div>
              </div>
            </div>
          </div>

        </div>
        {/* Connected Apps cards */}

        <section className="pb-6 border-b border-gray-200 dark:border-gray-700/60">
          <div className="grid grid-cols-12 gap-6">

            {/* Card 1 */}
        {apps?.map(app => {
          return(
            <div className="col-span-full xl:col-span-6 2xl:col-span-4 bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700/60 shadow-sm rounded-lg">
              {/* Card content */}
              <div className="flex flex-col h-full p-5">
                <div className="grow">
                  <header className="flex items-center mb-4">
                    <div className={'w-10 h-10 rounded-full shrink-0 mr-3 ' + app?.icon}>
                      <svg className="w-10 h-10 fill-current text-white" viewBox="0 0 40 40">
                        <path d="M26.946 18.005a.583.583 0 00-.53-.34h-6.252l.985-3.942a.583.583 0 00-1.008-.52l-7 8.167a.583.583 0 00.442.962h6.252l-.984 3.943a.583.583 0 001.008.52l7-8.167a.583.583 0 00.087-.623z" />
                      </svg>
                    </div>
                    <h3 className="text-lg text-gray-800 dark:text-gray-100 font-semibold">{app?.name}</h3>
                  </header>
                  <div className="text-sm">{app?.description}</div>
                </div>
                {/* Card footer */}
                <footer className="mt-4">
                  <div className="flex flex-wrap justify-between items-center">
                    {/* Left side */}
                    <div className="flex space-x-3">
                      <div className="flex items-center text-gray-400 dark:text-gray-500">
                        <svg className="shrink-0 fill-current mr-1.5" width="16" height="16" viewBox="0 0 16 16">
                          <path d="M14.14 9.585a2.5 2.5 0 00-3.522 3.194c-.845.63-1.87.97-2.924.971a4.979 4.979 0 01-1.113-.135 4.436 4.436 0 01-1.343 1.682 6.91 6.91 0 006.9-1.165 2.5 2.5 0 002-4.547h.002zM10.125 2.188a2.5 2.5 0 10-.4 2.014 5.027 5.027 0 012.723 3.078c.148-.018.297-.028.446-.03a4.5 4.5 0 011.7.334 7.023 7.023 0 00-4.469-5.396zM4.663 10.5a2.49 2.49 0 00-1.932-1.234 4.624 4.624 0 01-.037-.516 4.97 4.97 0 011.348-3.391 4.456 4.456 0 01-.788-2.016A6.989 6.989 0 00.694 8.75c.004.391.04.781.11 1.166a2.5 2.5 0 103.86.584z" />
                        </svg>
                        <div className="text-sm text-gray-500 dark:text-gray-300">{app?.downloads}+</div>
                      </div>
                      <div className="flex items-center text-yellow-500">
                        <svg className="shrink-0 fill-current mr-1.5" width="16" height="16" viewBox="0 0 16 16">
                          <path d="M10 5.934L8 0 6 5.934H0l4.89 3.954L2.968 16 8 12.223 13.032 16 11.11 9.888 16 5.934z" />
                        </svg>
                        <div className="text-sm text-yellow-600">{app?.rating}</div>
                      </div>
                    </div>
                    {/* Right side */}
                    {app?.is_installed ?
                        <button className="btn-sm border-gray-200 dark:border-gray-700/60 hover:border-gray-300 dark:hover:border-gray-600 shadow-sm flex items-center">
                          <svg className="w-3 h-3 shrink-0 fill-current text-green-500 mr-2" viewBox="0 0 12 12">
                            <path d="M10.28 1.28L3.989 7.575 1.695 5.28A1 1 0 00.28 6.695l3 3a1 1 0 001.414 0l7-7A1 1 0 0010.28 1.28z" />
                          </svg>
                          <span>Connected</span>
                        </button>
                        :
                        <button className="btn-sm border-gray-200 dark:border-gray-700/60 hover:border-gray-300 dark:hover:border-gray-600 shadow-sm flex items-center">
                          <span>Install</span>
                        </button>
                    }
                  </div>
                </footer>
              </div>
            </div>
          )
        })}
          </div>
        </section>


      </div>

    </div>
  )
}
