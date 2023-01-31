import Loading from "./Loading";
import Send from "../icons/Send";


function classNames(...classes) {
    return classes.filter(Boolean).join(' ')
}


export default function MediaCard({title, description, loading, image = <Send/>, border = false}) {
    return (
        <div className="inboxwp-w-full">
            {loading ? <Loading/> : <>
                <dl className="inboxwp-mt-5">
                    <div
                        after=""
                        className={
                            `
                                    inboxwp-relative
                                    inboxwp-flex
                                    inboxwp-place-content-between
                                    inboxwp-overflow-hidden
                                    inboxwp-rounded-lg
                                    inboxwp-bg-white
                                    inboxwp-px-4
                                    inboxwp-pt-5
                                    inboxwp-pb-6
                                    inboxwp-shadow
                                    sm:inboxwp-px-6
                                    sm:inboxwp-pt-6
                                    ${border ? "after:inboxwp-absolute after:inboxwp-bottom-[27px] after:inboxwp-left-[89px] after:inboxwp-w-[110.2px] after:inboxwp-h-[4px] after:inboxwp-bg-[#6366F1] after:inboxwp-text-red-800 after:inboxwp-rounded-[53px]" : ''}
                                `
                        }
                    >
                        <div className="inboxwp-flex">
                            <dt>
                                <div className="inboxwp-absolute inboxwp-rounded-md">
                                    {image}
                                </div>
                            </dt>
                            <dd className="inboxwp-ml-16 inboxwp-pb-6 sm:inboxwp-pb-7">
                                <p className="inboxwp-text-[14px] inboxwp-text-[#6B7280] inboxwp-font-medium">{title ? title : 'Default title'}</p>
                                <p className="inboxwp-text-[24px] inboxwp-text-[#111827] inboxwp-font-semibold">
                                    {description != undefined ? description : 0}
                                </p>
                            </dd>
                        </div>
                        <div>
                            <svg width="20" height="20" viewBox="0 0 20 20" fill="none"
                                 xmlns="http://www.w3.org/2000/svg">
                                <path fillRule="evenodd" clipRule="evenodd"
                                      d="M1.41406 9.99992C1.41406 5.25808 5.25808 1.41406 9.99992 1.41406C14.7418 1.41406 18.5858 5.25808 18.5858 9.99992C18.5858 14.7418 14.7418 18.5858 9.99992 18.5858C5.25808 18.5858 1.41406 14.7418 1.41406 9.99992ZM9.99992 3.43426C6.37381 3.43426 3.43426 6.37381 3.43426 9.99992C3.43426 13.626 6.37381 16.5656 9.99992 16.5656C13.626 16.5656 16.5656 13.626 16.5656 9.99992C16.5656 6.37381 13.626 3.43426 9.99992 3.43426ZM10.0001 5.95972C10.558 5.95972 11.0102 6.41196 11.0102 6.96982V10.0001C11.0102 10.558 10.558 11.0102 10.0001 11.0102C9.44225 11.0102 8.99002 10.558 8.99002 10.0001V6.96982C8.99002 6.41196 9.44225 5.95972 10.0001 5.95972ZM10.0003 13.7879C10.4187 13.7879 10.7579 13.4487 10.7579 13.0303C10.7579 12.6119 10.4187 12.2727 10.0003 12.2727C9.58192 12.2727 9.24274 12.6119 9.24274 13.0303C9.24274 13.4487 9.58192 13.7879 10.0003 13.7879Z"
                                      fill="#D0D1D2"/>
                            </svg>
                        </div>
                    </div>
                </dl>
            </>}
        </div>
    );
}