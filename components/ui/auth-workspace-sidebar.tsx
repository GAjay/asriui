'use client'

import {useEffect, useRef, useState} from 'react'
import {useAppProvider} from '@/app/app-provider'
import {useSelectedLayoutSegments} from 'next/navigation'
import {Transition} from '@headlessui/react'
import {getBreakpoint} from '../utils/utils'
import AuthSidebarLinkGroup from './auth-sidebar-link-group'
import AuthSidebarLink from './auth-sidebar-link'
import Logo from './logo'
import {rescan_gt} from "sucrase/dist/types/parser/tokenizer";
import card3 from "@/components/cards/card3";

export default function WorkspaceSidebar({
                                           variant = 'default',
                                       }: {
    variant?: 'default' | 'v2'
}) {
    const sidebar = useRef<HTMLDivElement>(null)
    const {sidebarOpen, setSidebarOpen} = useAppProvider()
    const [sidebarExpanded, setSidebarExpanded] = useState<boolean>(false)
    const segments = useSelectedLayoutSegments()
    const [breakpoint, setBreakpoint] = useState<string | undefined>(getBreakpoint())
    const expandOnly = !sidebarExpanded && (breakpoint === 'lg' || breakpoint === 'xl')

    const workspaceMenus = [
        {name:'Course', url:"/workspace/1/course", slug:'course'},
        {name:'Chat', url:"/workspace/1/chat", slug:'chat'},
        {name:'Feed', url:"/workspace/1/feed", slug:'feed'},
        {name:'Forum', url:"/workspace/1/forum", slug:'forum'},
        {name:'Blog', url:"/workspace/1/blog", slug:'blog'},
        {name:'Files', url:"/workspace/1/files", slug:'files'},
    ]

    // close on click outside
    useEffect(() => {
        const clickHandler = ({target}: { target: EventTarget | null }): void => {
            if (!sidebar.current) return
            if (!sidebarOpen || sidebar.current.contains(target as Node)) return
            setSidebarOpen(false)
        }
        document.addEventListener('click', clickHandler)
        return () => document.removeEventListener('click', clickHandler)
    })

    // close if the esc key is pressed
    useEffect(() => {
        const keyHandler = ({keyCode}: { keyCode: number }): void => {
            if (!sidebarOpen || keyCode !== 27) return
            setSidebarOpen(false)
        }
        document.addEventListener('keydown', keyHandler)
        return () => document.removeEventListener('keydown', keyHandler)
    })


    const handleBreakpoint = () => {
        setBreakpoint(getBreakpoint())
    }

    useEffect(() => {
        window.addEventListener('resize', handleBreakpoint)
        return () => {
            window.removeEventListener('resize', handleBreakpoint)
        }
    }, [breakpoint])

    return (
        <div className={`min-w-fit ${sidebarExpanded ? 'sidebar-expanded' : ''}`}>
            {/* Sidebar backdrop (mobile only) */}
            <Transition
                as="div"
                className="fixed inset-0 bg-gray-900 bg-opacity-30 z-40 lg:hidden lg:z-auto"
                show={sidebarOpen}
                enter="transition-opacity ease-out duration-200"
                enterFrom="opacity-0"
                enterTo="opacity-100"
                leave="transition-opacity ease-out duration-100"
                leaveFrom="opacity-100"
                leaveTo="opacity-0"
                aria-hidden="true"
            />

            {/* Sidebar */}
            <Transition
                show={sidebarOpen}
                unmount={false}
                as="div"
                id="sidebar"
                ref={sidebar}
                className={`flex lg:!flex flex-col absolute z-40 left-0 top-0 lg:static lg:left-auto lg:top-auto lg:translate-x-0 h-[100dvh] overflow-y-scroll lg:overflow-y-auto no-scrollbar w-64 lg:w-20 lg:sidebar-expanded:!w-64 2xl:!w-64 shrink-0 bg-white dark:bg-gray-800 p-4 transition-all duration-200 ease-in-out ${variant === 'v2' ? 'border-r border-gray-200 dark:border-gray-700/60' : 'rounded-r-2xl shadow-sm'}`}
                enterFrom="-translate-x-full"
                enterTo="translate-x-0"
                leaveFrom="translate-x-0"
                leaveTo="-translate-x-full"
            >
                {/* Sidebar header */}
                <div className="flex justify-between mb-10 pr-3 sm:px-2">
                    {/* Close button */}
                    <button
                        className="lg:hidden text-gray-500 hover:text-gray-400"
                        onClick={() => setSidebarOpen(!sidebarOpen)}
                        aria-controls="sidebar"
                        aria-expanded={sidebarOpen}
                    >
                        <span className="sr-only">Close sidebar</span>
                        <svg className="w-6 h-6 fill-current" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                            <path d="M10.7 18.7l1.4-1.4L7.8 13H20v-2H7.8l4.3-4.3-1.4-1.4L4 12z"/>
                        </svg>
                    </button>
                    {/* Logo */}
                    <Logo/>
                </div>

                {/* Links */}
                <div className="space-y-8">
                    {/* Pages group */}
                    <div>

                        <ul className="mt-3">

                            {/* Campaigns */}
                            <li className={`pl-4 pr-3 py-2 rounded-lg mb-0.5 last:mb-0 bg-[linear-gradient(135deg,var(--tw-gradient-stops))] ${segments.includes('back') && 'from-violet-500/[0.12] dark:from-violet-500/[0.24] to-violet-500/[0.04]'}`}>
                                <AuthSidebarLink href="/channels">
                                    <div className="flex items-center">
                                        <svg className="shrink-0 fill-current text-gray-400 dark:text-gray-500"
                                             width="16" height="16"
                                             viewBox="0 0 16 16">
                                            <path
                                                d="M7.586 9H1a1 1 0 1 1 0-2h6.586L6.293 5.707a1 1 0 0 1 1.414-1.414l3 3a1 1 0 0 1 0 1.414l-3 3a1 1 0 1 1-1.414-1.414L7.586 9ZM3.075 4.572a1 1 0 1 1-1.64-1.144 8 8 0 1 1 0 9.144 1 1 0 0 1 1.64-1.144 6 6 0 1 0 0-6.856Z"></path>
                                        </svg>
                                        <span
                                            className="text-sm font-medium ml-4 lg:opacity-0 lg:sidebar-expanded:opacity-100 2xl:opacity-100 duration-200">Back</span>
                                    </div>
                                </AuthSidebarLink>
                            </li>

                            <li className={`pl-4 pr-3 py-2 rounded-lg mb-0.5 last:mb-0 bg-[linear-gradient(135deg,var(--tw-gradient-stops))] ${segments.includes('dashboard') && 'from-violet-500/[0.12] dark:from-violet-500/[0.24] to-violet-500/[0.04]'}`}>
                                <AuthSidebarLink href="/workspace/1/dashboard">
                                    <div className="flex items-center">
                                        <svg width="16" height="16"
                                             fill="currentColor" className={`shrink-0 fill-current ${segments.includes('dashboard') ? 'text-violet-500' : 'text-gray-400 dark:text-gray-500'}`} viewBox="0 0 16 16">
                                            <path
                                                d="M9.5 0a.5.5 0 0 1 .5.5.5.5 0 0 0 .5.5.5.5 0 0 1 .5.5V2a.5.5 0 0 1-.5.5h-5A.5.5 0 0 1 5 2v-.5a.5.5 0 0 1 .5-.5.5.5 0 0 0 .5-.5.5.5 0 0 1 .5-.5z"/>
                                            <path
                                                d="M3 2.5a.5.5 0 0 1 .5-.5H4a.5.5 0 0 0 0-1h-.5A1.5 1.5 0 0 0 2 2.5v12A1.5 1.5 0 0 0 3.5 16h9a1.5 1.5 0 0 0 1.5-1.5v-12A1.5 1.5 0 0 0 12.5 1H12a.5.5 0 0 0 0 1h.5a.5.5 0 0 1 .5.5v12a.5.5 0 0 1-.5.5h-9a.5.5 0 0 1-.5-.5z"/>
                                            <path
                                                d="M10 7a1 1 0 1 1 2 0v5a1 1 0 1 1-2 0zm-6 4a1 1 0 1 1 2 0v1a1 1 0 1 1-2 0zm4-3a1 1 0 0 0-1 1v3a1 1 0 1 0 2 0V9a1 1 0 0 0-1-1"/>
                                        </svg>
                                        <span
                                            className="text-sm font-medium ml-4 lg:opacity-0 lg:sidebar-expanded:opacity-100 2xl:opacity-100 duration-200">Dashboard</span>
                                    </div>
                                </AuthSidebarLink>
                            </li>

                            <li className={`pl-4 pr-3 py-2 rounded-lg mb-0.5 last:mb-0 bg-[linear-gradient(135deg,var(--tw-gradient-stops))] ${segments.includes('workspace') && 'from-violet-500/[0.12] dark:from-violet-500/[0.24] to-violet-500/[0.04]'}`}>
                                <AuthSidebarLink href="/workspace/1/workspace">
                                    <div className="flex items-center">
                                        <svg  width="16" height="16"
                                             fill="currentColor" className={`shrink-0 fill-current ${segments.includes('workspace') ? 'text-violet-500' : 'text-gray-400 dark:text-gray-500'}`} viewBox="0 0 16 16">
                                            <path
                                                d="M4 16s-1 0-1-1 1-4 5-4 5 3 5 4-1 1-1 1zm4-5.95a2.5 2.5 0 1 0 0-5 2.5 2.5 0 0 0 0 5"/>
                                            <path
                                                d="M2 1a2 2 0 0 0-2 2v9.5A1.5 1.5 0 0 0 1.5 14h.653a5.4 5.4 0 0 1 1.066-2H1V3a1 1 0 0 1 1-1h12a1 1 0 0 1 1 1v9h-2.219c.554.654.89 1.373 1.066 2h.653a1.5 1.5 0 0 0 1.5-1.5V3a2 2 0 0 0-2-2z"/>
                                        </svg>
                                        <span
                                            className="text-sm font-medium ml-4 lg:opacity-0 lg:sidebar-expanded:opacity-100 2xl:opacity-100 duration-200">Workspace</span>
                                    </div>
                                </AuthSidebarLink>
                            </li>

                            {/* Offerings */}
                            <li className={`pl-4 pr-3 py-2 rounded-lg mb-0.5 last:mb-0 bg-[linear-gradient(135deg,var(--tw-gradient-stops))] ${segments.includes('offering') && 'from-violet-500/[0.12] dark:from-violet-500/[0.24] to-violet-500/[0.04]'}`}>
                                <AuthSidebarLink href="/workspace/1/offering">
                                    <div className="flex items-center">
                                        <svg width="16" height="16"
                                             fill="currentColor" className={`shrink-0 fill-current ${segments.includes('offering') ? 'text-violet-500' : 'text-gray-400 dark:text-gray-500'}`} viewBox="0 0 16 16">
                                            <path fill-rule="evenodd"
                                                  d="M7.646 10.854a.5.5 0 0 0 .708 0l2-2a.5.5 0 0 0-.708-.708L8.5 9.293V5.5a.5.5 0 0 0-1 0v3.793L6.354 8.146a.5.5 0 1 0-.708.708z"/>
                                            <path
                                                d="M4.406 3.342A5.53 5.53 0 0 1 8 2c2.69 0 4.923 2 5.166 4.579C14.758 6.804 16 8.137 16 9.773 16 11.569 14.502 13 12.687 13H3.781C1.708 13 0 11.366 0 9.318c0-1.763 1.266-3.223 2.942-3.593.143-.863.698-1.723 1.464-2.383m.653.757c-.757.653-1.153 1.44-1.153 2.056v.448l-.445.049C2.064 6.805 1 7.952 1 9.318 1 10.785 2.23 12 3.781 12h8.906C13.98 12 15 10.988 15 9.773c0-1.216-1.02-2.228-2.313-2.228h-.5v-.5C12.188 4.825 10.328 3 8 3a4.53 4.53 0 0 0-2.941 1.1z"/>
                                        </svg>
                                        <span
                                            className="text-sm font-medium ml-4 lg:opacity-0 lg:sidebar-expanded:opacity-100 2xl:opacity-100 duration-200">Offering</span>
                                    </div>
                                </AuthSidebarLink>
                            </li>

                            {/* Plans */}
                            <li className={`pl-4 pr-3 py-2 rounded-lg mb-0.5 last:mb-0 bg-[linear-gradient(135deg,var(--tw-gradient-stops))] ${segments.includes('plans') && 'from-violet-500/[0.12] dark:from-violet-500/[0.24] to-violet-500/[0.04]'}`}>
                                <AuthSidebarLink href="/workspace/1/plans">
                                    <div className="flex items-center">
                                        <svg  width="16" height="16"
                                             fill="currentColor" className={`shrink-0 fill-current ${segments.includes('plans') ? 'text-violet-500' : 'text-gray-400 dark:text-gray-500'}`} viewBox="0 0 16 16">
                                            <path
                                                d="M1 2.5a.5.5 0 0 1 .5-.5h3.797a.5.5 0 0 1 .439.26L11 13h3.5a.5.5 0 0 1 0 1h-3.797a.5.5 0 0 1-.439-.26L5 3H1.5a.5.5 0 0 1-.5-.5m10 0a.5.5 0 0 1 .5-.5h3a.5.5 0 0 1 0 1h-3a.5.5 0 0 1-.5-.5"/>
                                        </svg>
                                        <span
                                            className="text-sm font-medium ml-4 lg:opacity-0 lg:sidebar-expanded:opacity-100 2xl:opacity-100 duration-200">Plans</span>
                                    </div>
                                </AuthSidebarLink>
                            </li>
                            {/* Plans */}
                            <li className={`pl-4 pr-3 py-2 rounded-lg mb-0.5 last:mb-0 bg-[linear-gradient(135deg,var(--tw-gradient-stops))] ${segments.includes('template') && 'from-violet-500/[0.12] dark:from-violet-500/[0.24] to-violet-500/[0.04]'}`}>
                                <AuthSidebarLink href="/workspace/1/template">
                                    <div className="flex items-center">
                                        <svg  width="16" height="16"
                                             fill="currentColor" className={`shrink-0 fill-current ${segments.includes('template') ? 'text-violet-500' : 'text-gray-400 dark:text-gray-500'}`} viewBox="0 0 16 16">
                                            <path fill-rule="evenodd"
                                                  d="M6 3.5A1.5 1.5 0 0 1 7.5 2h1A1.5 1.5 0 0 1 10 3.5v1A1.5 1.5 0 0 1 8.5 6v1H14a.5.5 0 0 1 .5.5v1a.5.5 0 0 1-1 0V8h-5v.5a.5.5 0 0 1-1 0V8h-5v.5a.5.5 0 0 1-1 0v-1A.5.5 0 0 1 2 7h5.5V6A1.5 1.5 0 0 1 6 4.5zM8.5 5a.5.5 0 0 0 .5-.5v-1a.5.5 0 0 0-.5-.5h-1a.5.5 0 0 0-.5.5v1a.5.5 0 0 0 .5.5zM0 11.5A1.5 1.5 0 0 1 1.5 10h1A1.5 1.5 0 0 1 4 11.5v1A1.5 1.5 0 0 1 2.5 14h-1A1.5 1.5 0 0 1 0 12.5zm1.5-.5a.5.5 0 0 0-.5.5v1a.5.5 0 0 0 .5.5h1a.5.5 0 0 0 .5-.5v-1a.5.5 0 0 0-.5-.5zm4.5.5A1.5 1.5 0 0 1 7.5 10h1a1.5 1.5 0 0 1 1.5 1.5v1A1.5 1.5 0 0 1 8.5 14h-1A1.5 1.5 0 0 1 6 12.5zm1.5-.5a.5.5 0 0 0-.5.5v1a.5.5 0 0 0 .5.5h1a.5.5 0 0 0 .5-.5v-1a.5.5 0 0 0-.5-.5zm4.5.5a1.5 1.5 0 0 1 1.5-1.5h1a1.5 1.5 0 0 1 1.5 1.5v1a1.5 1.5 0 0 1-1.5 1.5h-1a1.5 1.5 0 0 1-1.5-1.5zm1.5-.5a.5.5 0 0 0-.5.5v1a.5.5 0 0 0 .5.5h1a.5.5 0 0 0 .5-.5v-1a.5.5 0 0 0-.5-.5z"/>
                                        </svg>
                                        <span
                                            className="text-sm font-medium ml-4 lg:opacity-0 lg:sidebar-expanded:opacity-100 2xl:opacity-100 duration-200">Template</span>
                                    </div>
                                </AuthSidebarLink>
                            </li>

                            {/* Dashboard */}
                            <AuthSidebarLinkGroup open={segments.includes('finance')}>
                                {(handleClick, open) => {
                                    return (
                                        <>
                                            <a
                                                href="#0"
                                                className={`block text-gray-800 dark:text-gray-100 truncate transition ${segments.includes('finance') ? '' : 'hover:text-gray-900 dark:hover:text-white'
                                                }`}
                                                onClick={(e) => {
                                                    e.preventDefault();
                                                    expandOnly ? setSidebarExpanded(true) : handleClick()
                                                }}
                                            >
                                                <div className="flex items-center justify-between">
                                                    <div className="flex items-center">
                                                        <svg
                                                            className={`shrink-0 fill-current ${segments.includes('finance') ? 'text-violet-500' : 'text-gray-400 dark:text-gray-500'}`}
                                                            width="16" height="16"
                                                            viewBox="0 0 16 16">
                                                            <path
                                                                d="M5.936.278A7.983 7.983 0 0 1 8 0a8 8 0 1 1-8 8c0-.722.104-1.413.278-2.064a1 1 0 1 1 1.932.516A5.99 5.99 0 0 0 2 8a6 6 0 1 0 6-6c-.53 0-1.045.076-1.548.21A1 1 0 1 1 5.936.278Z"/>
                                                            <path
                                                                d="M6.068 7.482A2.003 2.003 0 0 0 8 10a2 2 0 1 0-.518-3.932L3.707 2.293a1 1 0 0 0-1.414 1.414l3.775 3.775Z"/>
                                                        </svg>
                                                        <span
                                                            className="text-sm font-medium ml-4 lg:opacity-0 lg:sidebar-expanded:opacity-100 2xl:opacity-100 duration-200">
                                                          Finance
                                                        </span>
                                                    </div>
                                                    {/* Icon */}
                                                    <div className="flex shrink-0 ml-2">
                                                        <svg
                                                            className={`w-3 h-3 shrink-0 ml-1 fill-current text-gray-400 dark:text-gray-500 ${open && 'rotate-180'}`}
                                                            viewBox="0 0 12 12">
                                                            <path d="M5.9 11.4L.5 6l1.4-1.4 4 4 4-4L11.3 6z"/>
                                                        </svg>
                                                    </div>
                                                </div>
                                            </a>
                                            <div className="lg:hidden lg:sidebar-expanded:block 2xl:block">
                                                <ul className={`pl-8 mt-1 ${!open && 'hidden'}`}>
                                                    <li className="mb-1 last:mb-0">
                                                        <AuthSidebarLink href="/workspace/1/payout">
                                                            <span
                                                                className="text-sm font-medium lg:opacity-0 lg:sidebar-expanded:opacity-100 2xl:opacity-100 duration-200">
                                                            Payouts
                                                            </span>
                                                        </AuthSidebarLink>
                                                    </li>
                                                    <li className="mb-1 last:mb-0">
                                                        <AuthSidebarLink href="/workspace/1/payout">
                              <span
                                  className="text-sm font-medium lg:opacity-0 lg:sidebar-expanded:opacity-100 2xl:opacity-100 duration-200">
                                Orders
                              </span>
                                                        </AuthSidebarLink>
                                                    </li>
                                                    <li className="mb-1 last:mb-0">
                                                        <AuthSidebarLink href="/workspace/1/payout">
                              <span
                                  className="text-sm font-medium lg:opacity-0 lg:sidebar-expanded:opacity-100 2xl:opacity-100 duration-200">
                                Disputes
                              </span>
                                                        </AuthSidebarLink>
                                                    </li>
                                                </ul>
                                            </div>
                                        </>
                                    )
                                }}
                            </AuthSidebarLinkGroup>

                            {/* Campaigns */}
                            <li className={`pl-4 pr-3 py-2 rounded-lg mb-0.5 last:mb-0 bg-[linear-gradient(135deg,var(--tw-gradient-stops))] ${segments.includes('tiers') && 'from-violet-500/[0.12] dark:from-violet-500/[0.24] to-violet-500/[0.04]'}`}>
                                <AuthSidebarLink href="/workspace/1/workspace">
                                    <div className="flex items-center">
                                        <svg width="16" height="16"
                                             fill="currentColor" className={`shrink-0 fill-current ${segments.includes('tiers') ? 'text-violet-500' : 'text-gray-400 dark:text-gray-500'}`} viewBox="0 0 16 16">
                                            <path
                                                d="M0 2a2 2 0 0 1 2-2h8a2 2 0 0 1 2 2v2h2a2 2 0 0 1 2 2v8a2 2 0 0 1-2 2H6a2 2 0 0 1-2-2v-2H2a2 2 0 0 1-2-2zm2-1a1 1 0 0 0-1 1v8a1 1 0 0 0 1 1h8a1 1 0 0 0 1-1V2a1 1 0 0 0-1-1z"/>
                                        </svg>
                                        <span
                                            className="text-sm font-medium ml-4 lg:opacity-0 lg:sidebar-expanded:opacity-100 2xl:opacity-100 duration-200">Tiers</span>
                                    </div>
                                </AuthSidebarLink>
                            </li>

                            <li className={`pl-4 pr-3 py-2 rounded-lg mb-0.5 last:mb-0 bg-[linear-gradient(135deg,var(--tw-gradient-stops))] ${segments.includes('edit-channel') && 'from-violet-500/[0.12] dark:from-violet-500/[0.24] to-violet-500/[0.04]'}`}>
                                <AuthSidebarLink href="/workspace/1/workspace">
                                    <div className="flex items-center">
                                        <svg width="16" height="16"
                                             fill="currentColor" className={`shrink-0 fill-current ${segments.includes('tiers') ? 'text-violet-500' : 'text-gray-400 dark:text-gray-500'}`} viewBox="0 0 16 16">
                                            <path
                                                d="M15.502 1.94a.5.5 0 0 1 0 .706L14.459 3.69l-2-2L13.502.646a.5.5 0 0 1 .707 0l1.293 1.293zm-1.75 2.456-2-2L4.939 9.21a.5.5 0 0 0-.121.196l-.805 2.414a.25.25 0 0 0 .316.316l2.414-.805a.5.5 0 0 0 .196-.12l6.813-6.814z"/>
                                            <path fill-rule="evenodd"
                                                  d="M1 13.5A1.5 1.5 0 0 0 2.5 15h11a1.5 1.5 0 0 0 1.5-1.5v-6a.5.5 0 0 0-1 0v6a.5.5 0 0 1-.5.5h-11a.5.5 0 0 1-.5-.5v-11a.5.5 0 0 1 .5-.5H9a.5.5 0 0 0 0-1H2.5A1.5 1.5 0 0 0 1 2.5z"/>
                                        </svg>
                                        <span
                                            className="text-sm font-medium ml-4 lg:opacity-0 lg:sidebar-expanded:opacity-100 2xl:opacity-100 duration-200">Edit Channel</span>
                                    </div>
                                </AuthSidebarLink>
                            </li>


                        </ul>
                    </div>

                </div>

                {/* Expand / collapse button */}
                <div className="pt-3 hidden lg:inline-flex 2xl:hidden justify-end mt-auto">
                    <div className="w-12 pl-4 pr-3 py-2">
                        <button
                            className="text-gray-400 hover:text-gray-500 dark:text-gray-500 dark:hover:text-gray-400"
                            onClick={() => setSidebarExpanded(!sidebarExpanded)}>
                            <span className="sr-only">Expand / collapse sidebar</span>
                            <svg
                                className="shrink-0 fill-current text-gray-400 dark:text-gray-500 sidebar-expanded:rotate-180"
                                xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 16 16">
                                <path
                                    d="M15 16a1 1 0 0 1-1-1V1a1 1 0 1 1 2 0v14a1 1 0 0 1-1 1ZM8.586 7H1a1 1 0 1 0 0 2h7.586l-2.793 2.793a1 1 0 1 0 1.414 1.414l4.5-4.5A.997.997 0 0 0 12 8.01M11.924 7.617a.997.997 0 0 0-.217-.324l-4.5-4.5a1 1 0 0 0-1.414 1.414L8.586 7M12 7.99a.996.996 0 0 0-.076-.373Z"/>
                            </svg>
                        </button>
                    </div>
                </div>
            </Transition>
        </div>
    )
}
