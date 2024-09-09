'use client'

import {useEffect, useRef, useState} from 'react'
import {useAppProvider} from '@/app/app-provider'
import {useSelectedLayoutSegments} from 'next/navigation'
import {Transition} from '@headlessui/react'
import {getBreakpoint} from '../utils/utils'
import AuthSidebarLinkGroup from './auth-sidebar-link-group'
import AuthSidebarLink from './auth-sidebar-link'
import Logo from './logo'

export default function ChannelSidebar({
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
                                             xmlns="http://www.w3.org/2000/svg" width="16" height="16"
                                             viewBox="0 0 16 16">
                                            <path
                                                d="M7.586 9H1a1 1 0 1 1 0-2h6.586L6.293 5.707a1 1 0 0 1 1.414-1.414l3 3a1 1 0 0 1 0 1.414l-3 3a1 1 0 1 1-1.414-1.414L7.586 9ZM3.075 4.572a1 1 0 1 1-1.64-1.144 8 8 0 1 1 0 9.144 1 1 0 0 1 1.64-1.144 6 6 0 1 0 0-6.856Z"></path>
                                        </svg>
                                        <span
                                            className="text-sm font-medium ml-4 lg:opacity-0 lg:sidebar-expanded:opacity-100 2xl:opacity-100 duration-200">Back</span>
                                    </div>
                                </AuthSidebarLink>
                            </li>
                            {/* Campaigns */}
                            <li className={`pl-4 pr-3 py-2 rounded-lg mb-0.5 last:mb-0 bg-[linear-gradient(135deg,var(--tw-gradient-stops))] ${segments.includes('dashboard') && 'from-violet-500/[0.12] dark:from-violet-500/[0.24] to-violet-500/[0.04]'}`}>
                                <AuthSidebarLink href="/">
                                    <div className="flex items-center">
                                        <svg
                                            className={`shrink-0 fill-current ${segments.includes('dashboard') ? 'text-violet-500' : 'text-gray-400 dark:text-gray-500'}`}
                                            xmlns="http://www.w3.org/2000/svg" width="16" height="16"
                                            viewBox="0 0 16 16">
                                            <path
                                                d="M12 1a1 1 0 1 0-2 0v2a3 3 0 0 0 3 3h2a1 1 0 1 0 0-2h-2a1 1 0 0 1-1-1V1ZM1 10a1 1 0 1 0 0 2h2a1 1 0 0 1 1 1v2a1 1 0 1 0 2 0v-2a3 3 0 0 0-3-3H1ZM5 0a1 1 0 0 1 1 1v2a3 3 0 0 1-3 3H1a1 1 0 0 1 0-2h2a1 1 0 0 0 1-1V1a1 1 0 0 1 1-1ZM12 13a1 1 0 0 1 1-1h2a1 1 0 1 0 0-2h-2a3 3 0 0 0-3 3v2a1 1 0 1 0 2 0v-2Z"/>
                                        </svg>
                                        <span
                                            className="text-sm font-medium ml-4 lg:opacity-0 lg:sidebar-expanded:opacity-100 2xl:opacity-100 duration-200">Dashboard</span>
                                    </div>
                                </AuthSidebarLink>
                            </li>
                            <li className={`pl-4 pr-3 py-2 rounded-lg mb-0.5 last:mb-0 bg-[linear-gradient(135deg,var(--tw-gradient-stops))] ${segments.includes('users') && 'from-violet-500/[0.12] dark:from-violet-500/[0.24] to-violet-500/[0.04]'}`}>
                                <AuthSidebarLink href="/channels/1/users">
                                    <div className="flex items-center">
                                        <svg
                                            className={`shrink-0 fill-current ${segments.includes('users') ? 'text-violet-500' : 'text-gray-400 dark:text-gray-500'}`}
                                            xmlns="http://www.w3.org/2000/svg" width="16" height="16"
                                            viewBox="0 0 16 16">
                                            <path
                                                d="M12 1a1 1 0 1 0-2 0v2a3 3 0 0 0 3 3h2a1 1 0 1 0 0-2h-2a1 1 0 0 1-1-1V1ZM1 10a1 1 0 1 0 0 2h2a1 1 0 0 1 1 1v2a1 1 0 1 0 2 0v-2a3 3 0 0 0-3-3H1ZM5 0a1 1 0 0 1 1 1v2a3 3 0 0 1-3 3H1a1 1 0 0 1 0-2h2a1 1 0 0 0 1-1V1a1 1 0 0 1 1-1ZM12 13a1 1 0 0 1 1-1h2a1 1 0 1 0 0-2h-2a3 3 0 0 0-3 3v2a1 1 0 1 0 2 0v-2Z"/>
                                        </svg>
                                        <span
                                            className="text-sm font-medium ml-4 lg:opacity-0 lg:sidebar-expanded:opacity-100 2xl:opacity-100 duration-200">Users</span>
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
                                                            xmlns="http://www.w3.org/2000/svg" width="16" height="16"
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
                                                        <AuthSidebarLink href="/channels/1/payout">
                                                            <span
                                                                className="text-sm font-medium lg:opacity-0 lg:sidebar-expanded:opacity-100 2xl:opacity-100 duration-200">
                                                            Payouts
                                                            </span>
                                                        </AuthSidebarLink>
                                                    </li>
                                                    <li className="mb-1 last:mb-0">
                                                        <AuthSidebarLink href="/dashboard/analytics">
                              <span
                                  className="text-sm font-medium lg:opacity-0 lg:sidebar-expanded:opacity-100 2xl:opacity-100 duration-200">
                                Orders
                              </span>
                                                        </AuthSidebarLink>
                                                    </li>
                                                    <li className="mb-1 last:mb-0">
                                                        <AuthSidebarLink href="/dashboard/fintech">
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

                            <AuthSidebarLinkGroup open={segments.includes('finance')}>
                                {(handleClick, open) => {
                                    return (
                                        <>
                                            <a
                                                href="#0"
                                                className={`block text-gray-800 dark:text-gray-100 truncate transition ${segments.includes('reports') ? '' : 'hover:text-gray-900 dark:hover:text-white'
                                                }`}
                                                onClick={(e) => {
                                                    e.preventDefault();
                                                    expandOnly ? setSidebarExpanded(true) : handleClick()
                                                }}
                                            >
                                                <div className="flex items-center justify-between">
                                                    <div className="flex items-center">
                                                        <svg
                                                            className={`shrink-0 fill-current ${segments.includes('reports') ? 'text-violet-500' : 'text-gray-400 dark:text-gray-500'}`}
                                                            xmlns="http://www.w3.org/2000/svg" width="16" height="16"
                                                            viewBox="0 0 16 16">
                                                            <path
                                                                d="M5.936.278A7.983 7.983 0 0 1 8 0a8 8 0 1 1-8 8c0-.722.104-1.413.278-2.064a1 1 0 1 1 1.932.516A5.99 5.99 0 0 0 2 8a6 6 0 1 0 6-6c-.53 0-1.045.076-1.548.21A1 1 0 1 1 5.936.278Z"/>
                                                            <path
                                                                d="M6.068 7.482A2.003 2.003 0 0 0 8 10a2 2 0 1 0-.518-3.932L3.707 2.293a1 1 0 0 0-1.414 1.414l3.775 3.775Z"/>
                                                        </svg>
                                                        <span
                                                            className="text-sm font-medium ml-4 lg:opacity-0 lg:sidebar-expanded:opacity-100 2xl:opacity-100 duration-200">
                              Settings
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
                                                        <AuthSidebarLink href="/dashboard">
                                                            <span
                                                                className="text-sm font-medium lg:opacity-0 lg:sidebar-expanded:opacity-100 2xl:opacity-100 duration-200">
                                                            Edit channel
                                                            </span>
                                                        </AuthSidebarLink>
                                                    </li>
                                                    <li className="mb-1 last:mb-0">
                                                        <AuthSidebarLink href="/dashboard/analytics">
                              <span
                                  className="text-sm font-medium lg:opacity-0 lg:sidebar-expanded:opacity-100 2xl:opacity-100 duration-200">
                                Orders
                              </span>
                                                        </AuthSidebarLink>
                                                    </li>
                                                    <li className="mb-1 last:mb-0">
                                                        <AuthSidebarLink href="/dashboard/fintech">
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

                            <li className={`pl-4 pr-3 py-2 rounded-lg mb-0.5 last:mb-0 bg-[linear-gradient(135deg,var(--tw-gradient-stops))] ${segments.includes('workspace') && 'from-violet-500/[0.12] dark:from-violet-500/[0.24] to-violet-500/[0.04]'}`}>
                                <AuthSidebarLink href="/channels/1/workspace">
                                    <div className="flex items-center">
                                        <svg
                                            className={`shrink-0 fill-current ${segments.includes('workspace') ? 'text-violet-500' : 'text-gray-400 dark:text-gray-500'}`}
                                            xmlns="http://www.w3.org/2000/svg" width="16" height="16"
                                            viewBox="0 0 16 16">
                                            <path
                                                d="M12 1a1 1 0 1 0-2 0v2a3 3 0 0 0 3 3h2a1 1 0 1 0 0-2h-2a1 1 0 0 1-1-1V1ZM1 10a1 1 0 1 0 0 2h2a1 1 0 0 1 1 1v2a1 1 0 1 0 2 0v-2a3 3 0 0 0-3-3H1ZM5 0a1 1 0 0 1 1 1v2a3 3 0 0 1-3 3H1a1 1 0 0 1 0-2h2a1 1 0 0 0 1-1V1a1 1 0 0 1 1-1ZM12 13a1 1 0 0 1 1-1h2a1 1 0 1 0 0-2h-2a3 3 0 0 0-3 3v2a1 1 0 1 0 2 0v-2Z"/>
                                        </svg>
                                        <span
                                            className="text-sm font-medium ml-4 lg:opacity-0 lg:sidebar-expanded:opacity-100 2xl:opacity-100 duration-200">Workspace</span>
                                    </div>
                                </AuthSidebarLink>
                            </li>

                            {/* Campaigns */}
                            <li className={`pl-4 pr-3 py-2 rounded-lg mb-0.5 last:mb-0 bg-[linear-gradient(135deg,var(--tw-gradient-stops))] ${segments.includes('campaigns') && 'from-violet-500/[0.12] dark:from-violet-500/[0.24] to-violet-500/[0.04]'}`}>
                                <AuthSidebarLink href="/channels">
                                    <div className="flex items-center">
                                        <svg
                                            className={`shrink-0 fill-current ${segments.includes('channels') ? 'text-violet-500' : 'text-gray-400 dark:text-gray-500'}`}
                                            xmlns="http://www.w3.org/2000/svg" width="16" height="16"
                                            viewBox="0 0 16 16">
                                            <path
                                                d="M12 1a1 1 0 1 0-2 0v2a3 3 0 0 0 3 3h2a1 1 0 1 0 0-2h-2a1 1 0 0 1-1-1V1ZM1 10a1 1 0 1 0 0 2h2a1 1 0 0 1 1 1v2a1 1 0 1 0 2 0v-2a3 3 0 0 0-3-3H1ZM5 0a1 1 0 0 1 1 1v2a3 3 0 0 1-3 3H1a1 1 0 0 1 0-2h2a1 1 0 0 0 1-1V1a1 1 0 0 1 1-1ZM12 13a1 1 0 0 1 1-1h2a1 1 0 1 0 0-2h-2a3 3 0 0 0-3 3v2a1 1 0 1 0 2 0v-2Z"/>
                                        </svg>
                                        <span
                                            className="text-sm font-medium ml-4 lg:opacity-0 lg:sidebar-expanded:opacity-100 2xl:opacity-100 duration-200">Edit Channels</span>
                                    </div>
                                </AuthSidebarLink>
                            </li>

                            {/* Campaigns */}
                            <li className={`pl-4 pr-3 py-2 rounded-lg mb-0.5 last:mb-0 bg-[linear-gradient(135deg,var(--tw-gradient-stops))] ${segments.includes('campaigns') && 'from-violet-500/[0.12] dark:from-violet-500/[0.24] to-violet-500/[0.04]'}`}>
                                <AuthSidebarLink href="/channels">
                                    <div className="flex items-center">
                                        <svg
                                            className={`shrink-0 fill-current ${segments.includes('channels') ? 'text-violet-500' : 'text-gray-400 dark:text-gray-500'}`}
                                            xmlns="http://www.w3.org/2000/svg" width="16" height="16"
                                            viewBox="0 0 16 16">
                                            <path
                                                d="M12 1a1 1 0 1 0-2 0v2a3 3 0 0 0 3 3h2a1 1 0 1 0 0-2h-2a1 1 0 0 1-1-1V1ZM1 10a1 1 0 1 0 0 2h2a1 1 0 0 1 1 1v2a1 1 0 1 0 2 0v-2a3 3 0 0 0-3-3H1ZM5 0a1 1 0 0 1 1 1v2a3 3 0 0 1-3 3H1a1 1 0 0 1 0-2h2a1 1 0 0 0 1-1V1a1 1 0 0 1 1-1ZM12 13a1 1 0 0 1 1-1h2a1 1 0 1 0 0-2h-2a3 3 0 0 0-3 3v2a1 1 0 1 0 2 0v-2Z"/>
                                        </svg>
                                        <span
                                            className="text-sm font-medium ml-4 lg:opacity-0 lg:sidebar-expanded:opacity-100 2xl:opacity-100 duration-200">Tiers</span>
                                    </div>
                                </AuthSidebarLink>
                            </li>

                            {/* Campaigns */}

                            <li className={`pl-4 pr-3 py-2 rounded-lg mb-0.5 last:mb-0 bg-[linear-gradient(135deg,var(--tw-gradient-stops))] ${segments.includes('offering') && 'from-violet-500/[0.12] dark:from-violet-500/[0.24] to-violet-500/[0.04]'}`}>
                                <AuthSidebarLink href="/channels/1/offering">
                                    <div className="flex items-center">
                                        <svg
                                            className={`shrink-0 fill-current ${segments.includes('offering') ? 'text-violet-500' : 'text-gray-400 dark:text-gray-500'}`}
                                            xmlns="http://www.w3.org/2000/svg" width="16" height="16"
                                            viewBox="0 0 16 16">
                                            <path
                                                d="M10.5 1a3.502 3.502 0 0 1 3.355 2.5H15a1 1 0 1 1 0 2h-1.145a3.502 3.502 0 0 1-6.71 0H1a1 1 0 0 1 0-2h6.145A3.502 3.502 0 0 1 10.5 1ZM9 4.5a1.5 1.5 0 1 1 3 0 1.5 1.5 0 0 1-3 0ZM5.5 9a3.502 3.502 0 0 1 3.355 2.5H15a1 1 0 1 1 0 2H8.855a3.502 3.502 0 0 1-6.71 0H1a1 1 0 1 1 0-2h1.145A3.502 3.502 0 0 1 5.5 9ZM4 12.5a1.5 1.5 0 1 0 3 0 1.5 1.5 0 0 0-3 0Z"
                                                fill-rule="evenodd"></path>
                                        </svg>
                                        <span
                                            className="text-sm font-medium ml-4 lg:opacity-0 lg:sidebar-expanded:opacity-100 2xl:opacity-100 duration-200">Offering</span>
                                    </div>
                                </AuthSidebarLink>
                            </li>

                            {/* Plans */}
                            <li className={`pl-4 pr-3 py-2 rounded-lg mb-0.5 last:mb-0 bg-[linear-gradient(135deg,var(--tw-gradient-stops))] ${segments.includes('plans') && 'from-violet-500/[0.12] dark:from-violet-500/[0.24] to-violet-500/[0.04]'}`}>
                                <AuthSidebarLink href="/channels/1/plans">
                                    <div className="flex items-center">
                                        <svg
                                            className={`shrink-0 fill-current ${segments.includes('plans') ? 'text-violet-500' : 'text-gray-400 dark:text-gray-500'}`}
                                            xmlns="http://www.w3.org/2000/svg" width="16" height="16"
                                            viewBox="0 0 16 16">
                                            <path
                                                d="M10.5 1a3.502 3.502 0 0 1 3.355 2.5H15a1 1 0 1 1 0 2h-1.145a3.502 3.502 0 0 1-6.71 0H1a1 1 0 0 1 0-2h6.145A3.502 3.502 0 0 1 10.5 1ZM9 4.5a1.5 1.5 0 1 1 3 0 1.5 1.5 0 0 1-3 0ZM5.5 9a3.502 3.502 0 0 1 3.355 2.5H15a1 1 0 1 1 0 2H8.855a3.502 3.502 0 0 1-6.71 0H1a1 1 0 1 1 0-2h1.145A3.502 3.502 0 0 1 5.5 9ZM4 12.5a1.5 1.5 0 1 0 3 0 1.5 1.5 0 0 0-3 0Z"
                                                fill-rule="evenodd"></path>
                                        </svg>
                                        <span
                                            className="text-sm font-medium ml-4 lg:opacity-0 lg:sidebar-expanded:opacity-100 2xl:opacity-100 duration-200">Plans</span>
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
