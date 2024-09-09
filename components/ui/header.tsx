'use client'

import {useState} from 'react'
import {useAppProvider} from '@/app/app-provider'

import Link from "next/link";
import routes from "@/app/constants/routes";
import MobileMenu from "@/components/ui/mobile-menu";
import Logo from "@/components/ui/logo";
import getCookie from "@/app/utils/getCookie";

export default function Header() {

    const token = getCookie("auth") as any;

    return (
        <header className="w-full z-30" style={{'borderBottom': '1px solid gray'}}>
            <div className="max-w-6xl mx-auto px-4 sm:px-6">
                <div className="flex items-center justify-between h-20">
                    {/* Site branding */}
                    <div className="shrink-0 mr-4">
                        {/* Logo */}
                        <Logo/>
                    </div>

                    {/* Desktop navigation */}
                    <nav className="hidden md:flex md:grow">
                        {/* Desktop sign in links */}
                        <ul className="flex grow justify-end flex-wrap items-center">
                            <li>
                                <Link
                                    href={routes.blogs}
                                    className="font-medium text-violet-500 hover:text-gray-200 px-4 py-3 flex items-center transition duration-150 ease-in-out"
                                >
                                    Blogs
                                </Link>
                            </li>
                            {!token ? (
                                <>
                                  <li>
                                    <Link
                                        href={routes.login}
                                        className="font-medium text-violet-500 hover:text-gray-200 px-4 py-3 flex items-center transition duration-150 ease-in-out"
                                    >
                                      Sign in
                                    </Link>
                                  </li>
                                  <li>
                                    <Link
                                        href={routes.login}
                                        className="btn-sm text-white bg-violet-500 hover:bg-violet-700 ml-3"
                                    >
                                      Sign up
                                    </Link>
                                  </li>
                                </>
                            ) : (
                                <>
                                    <li>
                                        <Link
                                            href={routes.channels}
                                            className="btn-sm text-white bg-violet-500 hover:bg-violet-700 ml-3"
                                        >
                                            Channels
                                        </Link>
                                    </li>
                                </>
                            )}
                        </ul>
                    </nav>

                    <MobileMenu/>
                </div>
            </div>
        </header>
    )
}
