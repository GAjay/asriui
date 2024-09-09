import { ReactElement } from 'react'

export const CampaignProperties = () => {

    const typeColor = (type: string): string => {
        switch (type) {
            case 'One-Time':
                return 'bg-green-500/20 text-green-700'
            case 'At Risk':
                return 'bg-yellow-500/20 text-yellow-700'
            case 'Off-Track':
                return 'bg-red-500/20 text-red-700'
            default:
                return 'bg-gray-100 dark:bg-gray-700 text-gray-500 dark:text-gray-400'
        }
    }

    const categoryIcon = (category: string): ReactElement => {
        switch (category) {
            case '1':
                return (
                    <div className="w-10 h-10 rounded-full flex items-center justify-center shrink-0 bg-red-500 mr-5">
                        <span className="text-white">LC</span>
                    </div>
                )
            case '2':
                return (
                    <div className="w-10 h-10 rounded-full flex items-center justify-center shrink-0 bg-green-500 mr-5">
                        <span className="text-white">LC</span>
                    </div>
                )
            case '3':
                return (
                    <div className="w-10 h-10 rounded-full flex items-center justify-center shrink-0 bg-sky-500 mr-5">
                        <span className="text-white">LC</span>
                    </div>
                )
            case '4':
                return (
                    <div className="w-10 h-10 rounded-full flex items-center justify-center shrink-0 bg-violet-500 mr-5">
                        <span className="text-white">LC</span>
                    </div>
                )
            default:
                return (<div></div>)
        }
    }

    return {
        typeColor,
        categoryIcon,
    }
}
