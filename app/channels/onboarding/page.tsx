export const metadata = {
    title: "Tell us what's your situation",
    description: 'Page description',
}

import Link from 'next/link'
import OnboardingHeader from './onboarding-header'
import OnboardingImage from './onboarding-image'
import OnboardingProgress from './onboarding-progress'
import RenderOnBoarding from './render-onboarding'

export default function OnBoarding() {
    return (
        <main className="dark:bg-gray-900 ">

            <div className="relative flex justify-center ">
                <RenderOnBoarding />

                {/*<OnboardingImage />*/}

            </div>

        </main>
    )
}
