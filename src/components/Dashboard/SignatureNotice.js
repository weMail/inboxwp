import React from "@wordpress/element";
import {Link} from "react-router-dom";

export default function SignatureNotice() {
    return (
        <div className="inboxwp-flex inboxwp-justify-between inboxwp-bg-yellow-50 inboxwp-p-3 inboxwp-sending-signature-notice-border">
            <div className="inboxwp-flex inboxwp-pt-[7px]">
                <svg className="inboxwp-mt-[6px]" width="16" height="14" viewBox="0 0 16 14" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path fillRule="evenodd" clipRule="evenodd" d="M6.25694 1.09882C7.02154 -0.26048 8.97863 -0.260481 9.74324 1.09882L15.3235 11.0194C16.0735 12.3526 15.11 13.9999 13.5804 13.9999H2.41978C0.890129 13.9999 -0.073299 12.3526 0.676631 11.0194L6.25694 1.09882ZM9 11C9 11.5523 8.55229 12 8 12C7.44772 12 7 11.5523 7 11C7 10.4477 7.44772 10 8 10C8.55229 10 9 10.4477 9 11ZM8 3C7.44772 3 7 3.44772 7 4V7C7 7.55228 7.44772 8 8 8C8.55228 8 9 7.55228 9 7V4C9 3.44772 8.55228 3 8 3Z" fill="#FBBF24"/>
                </svg>
                <p className="inboxwp-ml-3 inboxwp-text-[16px] inboxwp-text-gray-900">Send email from your branded emails.</p>
            </div>
            <div className={'inboxwp-w-[270px] inboxwp-flex inboxwp-justify-end'}>
                <div className={'inboxwp-w-[265px] inboxwp-text-end'}>
                    <Link to={'/sending-signatures'} type="button"
                       className="inboxwp-flex hover:inboxwp-text-[#6366F1] inboxwp-justify-end inboxwp-px-3 inboxwp-py-2 inboxwp-font-medium inboxwp-text-[#6366F1] inboxwp-ring-gray-300"
                    >
                        <p className={'inboxwp-text-[16px] inboxwp-font-sm inboxwp-border-b inboxwp-border-[#6366F1]'}>Configure sending signature</p>
                        <div className={'inboxwp-ml-2.5 inboxwp-mt-1'}>
                            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={3} stroke="currentColor" className="inboxwp-w-4 inboxwp-h-4">
                                <path strokeLinecap="round" strokeLinejoin="round" d="M4.5 12h15m0 0l-6.75-6.75M19.5 12l-6.75 6.75" />
                            </svg>
                        </div>
                    </Link>
                </div>
            </div>
        </div>
    );
}