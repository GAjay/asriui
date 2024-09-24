export const metadata = {
  title: 'Feed - Mosaic',
  description: 'Page description',
}

import Image from 'next/image'
import FeedLeftContent from './feed-left-content'
import FeedPosts from './feed-posts'
import FeedRightContent from './feed-right-content'
import Avatar from '@/public/images/user-40-02.jpg'

export default function Feed() {
  return (
    <div className="px-4 sm:px-6 lg:px-8 py-8 md:py-0 w-full max-w-[96rem] mx-auto">

      <div className="xl:flex">

        {/* Left + Middle content */}
        <div className="md:flex flex-1">

          {/* Left content */}
          {/*<FeedLeftContent />*/}

          {/* Middle content */}
          <div className="flex-1 md:ml-8 xl:mx-4 2xl:mx-8">
            <div className="md:py-8">

              {/* Blocks */}
              <div className="space-y-4">

                {/* Posts */}
                <FeedPosts />

              </div>

            </div>
          </div>

        </div>

        {/* Right content */}
        {/*<FeedRightContent />*/}

      </div>

    </div>
  )
}
