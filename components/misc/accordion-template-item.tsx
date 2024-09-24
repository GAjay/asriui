'use client'

import { useState } from 'react'
import Image, { StaticImageData } from 'next/image'
import Card5 from "@/components/cards/card5";
import TemplateCard from "@/components/misc/template-card";
import AppImage06 from "@/public/images/applications-image-06.jpg";
import AppImage05 from "@/public/images/applications-image-05.jpg";
import AppImage07 from "@/public/images/applications-image-07.jpg";
import AppImage21 from "@/public/images/applications-image-21.jpg";
import AppImage22 from "@/public/images/applications-image-22.jpg";
import AppImage23 from "@/public/images/applications-image-23.jpg";

interface Item {
  id: number
  image: StaticImageData
  customer: string
  total: string
  status: string
  items: number
  location: string
  type: string
  description: string
}

interface ItemProps {
  item: Item
}

export default function AccordionTemplateItem({ item }: ItemProps) {

  const [open, setOpen] = useState<boolean>(false)

  const blogs1 = [
    {
      id: 1,
      title: '50+ Best Business Ideas for Wom...',
      content: 'Women-owned businesses represent over 39% of all businesses - are you ready to join them? Find over 50 business ideas in this ...',
      image: AppImage21,
      tags:['Free']
    },
    {
      id: 2,
      title: 'How to Sell Courses on Udemy: A ...',
      content: 'With over 220,000 courses on Udemy, it’s no surprise that more and more instructors are flocking to the website. But how do you sell ...',
      image: AppImage22,
      tags:['Premium']
    },
    {
      id: 3,
      title: 'Survey Junkie Review: Can You Re...',
      content: 'With zero set-up costs, minimal barriers to entry, and no special skills needed, it\'s easy to see why people flock to paid online surveys ...',
      image: AppImage23,
      tags:['Premium','Exclusive']
    },
  ];

  return (
      <tbody className="text-sm bg-white">
      <tr>
        <td className="px-2 first:pl-5 last:pr-5 py-3 whitespace-nowrap flex-1">
          <div className="flex items-center text-gray-800">
            <div className="font-medium text-gray-800 dark:text-gray-100">Choose from one of the templates</div>
          </div>
        </td>
        <td className="px-2 first:pl-5 last:pr-5 py-3 whitespace-nowrap w-px">
          <div className="flex items-center">
            <button
                className={`text-gray-400 hover:text-gray-500 dark:text-gray-500 dark:hover:text-gray-400 ${open && 'rotate-180'}`}
                aria-expanded={open}
                onClick={() => setOpen(!open)}
                aria-controls={`description-${item.id}`}
            >
              <span className="sr-only">Menu</span>
              <svg className="w-8 h-8 fill-current" viewBox="0 0 32 32">
                <path d="M16 20l-5.4-5.4 1.4-1.4 4 4 4-4 1.4 1.4z" />
              </svg>
            </button>
          </div>
        </td>
      </tr>
      {/*
      Example of content revealing when clicking the button on the right side:
      Note that you must set a "colSpan" attribute on the <td> element,
      and it should match the number of columns in your table
      */}
      <tr id={`description-${item.id}`} role="region" className={`${!open && 'hidden'}`}>
        {blogs1.map(blog => (
            <TemplateCard
                key={blog.id}
                data={blog}/>
        ))}
      </tr>
      </tbody>

  )
}
