import Tooltip from "../Tooltip";
import React, {useEffect, useState} from "@wordpress/element";

export default function TopFixedSection() {
    const [iconColor, setIconColor] = useState()
    const [tooltipsText, setTooltipsText] = useState('')
    const [leftText, setLeftText] = useState('')

    useEffect(() => {
        if (inboxwp.ignoredPlugin) {
            setIconColor('#F87171')
            setLeftText(`Seems you are using ${inboxwp.ignoredPlugin} plugin to send bulk emails. Disable ${inboxwp.ignoredPlugin} plugin to continue using inboxWP for transactional email purposes`)
        } else {
            setIconColor('#34D399')
            setTooltipsText('InboxWP is powering up your WordPress transactional emails')
            setLeftText('All System go')
        }
    }, [inboxwp.ignoredPlugin])

    return (
        <div className="
                inboxwp-flex inboxwp-flex-col
                md:inboxwp-flex-row
                md:inboxwp-justify-between
                inboxwp-bg-white
                inboxwp-pt-[16px]
                inboxwp-pb-[16px]
                inboxwp-pl-[20px]
                inboxwp-pr-[20px]
                inboxwp-fixed  inboxwp-left-[160px] inboxwp-right-0 inboxwp-z-50
                inboxwp-h-[70px]
            ">
            <div className={'inboxwp-flex inboxwp-mt-1.5'}>
                <div className={'inboxwp-mr-3 inboxwp-h-[24px] inboxwp-w-[24px]'}>
                    {
                        inboxwp.ignoredPlugin ?
                            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="inboxwp-w-6 inboxwp-h-6">
                                <path strokeLinecap="round" stroke="#FFA500" strokeLinejoin="round" d="M12 9v3.75m9-.75a9 9 0 11-18 0 9 9 0 0118 0zm-9 3.75h.008v.008H12v-.008z" />
                            </svg>
                            :
                            <svg width="20" height="21" viewBox="0 0 20 21" fill="none" xmlns="http://www.w3.org/2000/svg">
                                <path d="M7 11L9 13L13 9.00001M18.6179 4.98434C18.4132 4.99472 18.2072 4.99997 18 4.99997C14.9265 4.99997 12.123 3.84453 9.99993 1.94434C7.87691 3.84446 5.07339 4.99985 2 4.99985C1.79277 4.99985 1.58678 4.9946 1.38213 4.98422C1.1327 5.94783 1 6.95842 1 8.00001C1 13.5915 4.82432 18.2898 10 19.622C15.1757 18.2898 19 13.5915 19 8.00001C19 6.95847 18.8673 5.94791 18.6179 4.98434Z" stroke="#34D399" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                            </svg>
                    }
                </div>
                <p className={'inboxwp-text-gray-700 inboxwp-text-[14px] inboxwp-mr-3'}>
                    {leftText}
                </p>

                {
                    inboxwp.ignoredPlugin ?
                        ''
                        :
                        <div className={'inboxwp-h-[18px] inboxwp-w-[18px]'}>
                            <Tooltip text={tooltipsText}>
                                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="inboxwp-w-6 inboxwp-h-6">
                                    <path strokeLinecap="round" strokeLinejoin="round" d="M12 9v3.75m9-.75a9 9 0 11-18 0 9 9 0 0118 0zm-9 3.75h.008v.008H12v-.008z" />
                                </svg>
                            </Tooltip>
                        </div>
                }
            </div>
            <div className={'inboxwp-w-[169px] inboxwp-flex inboxwp-justify-end'}>
                <div className={'inboxwp-w-[156px] inboxwp-text-end'}>
                    <a href={inboxwp.appUrl + '/dashboard'} type="button"
                       className="inboxwp-flex hover:inboxwp-text-[#6366F1] inboxwp-justify-end inboxwp-rounded-md inboxwp-bg-white inboxwp-px-3 inboxwp-py-2 inboxwp-text-sm inboxwp-font-medium inboxwp-text-[#6366F1] inboxwp-shadow-sm inboxwp-ring-1 inboxwp-ring-gray-300"
                    >
                        SaaS Dashboard
                        <div className={'inboxwp-ml-2.5 inboxwp-mt-1'}>
                            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={4} stroke="currentColor" className="inboxwp-w-3 inboxwp-h-3">
                                <path strokeLinecap="round" strokeLinejoin="round" d="M4.5 19.5l15-15m0 0H8.25m11.25 0v11.25" />
                            </svg>
                        </div>
                    </a>
                </div>
            </div>
        </div>
    )
}