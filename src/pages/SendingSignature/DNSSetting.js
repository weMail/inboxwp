import React, {useEffect, useState, useRef} from "@wordpress/element"
import DefaultLayout from "../../layouts/DefaultLayout";
import {Link, useNavigate} from "react-router-dom";
import {Get, Post} from "../../core/Ajax";
import useNotification from "../../hooks/useNotification";
import LoadingIcon from "./Components/LoadingIcon";
import Tooltip from "../../components/Tooltip";

export default function DNSSettings () {
    const [domain, setDomain] = useState(null);
    const [loading, setLoading] = useState(false);
    const {notifyError} = useNotification(5000);
    const {notifyWarning} = useNotification(7000);
    const {notifySuccess} = useNotification(3000);
    const navigate = useNavigate();
    const returnPathRef = useRef(null);
    const dkimRef = useRef(null);

    useEffect(() => {
        fetchSignature();
    }, [])

    const fetchSignature = () => {
        setLoading(true)
        const response = Get(`${inboxwp.ajaxurl}?action=inboxwp_get_domain&hash=${inboxwp.hash}`);
        response.then((res) => {
            setDomain(res.data.domain)
        })
            .catch((err) => {
                notifyError(err?.data?.message || 'Something went wrong')
            })
            .finally(() => {
                setLoading(false)
            })
    }

    const verifyDKIM = () => {
        setLoading(true)
        const response = Post(inboxwp.ajaxurl, {action: 'inboxwp_verify_dkim', hash: inboxwp.hash, domain_id: domain.ID});
        response.then((res) => {
            setDomain(res.data.domain)
            if (! res.data.domain.DKIMVerified) {
                notifyWarning('InboxWP could not verify DNS records. Please make sure you have added the necessary DKIM and Return-Path DNS records to ensure effective email delivery')
            } else {
                navigate('/sending-signatures')
            }
        })
            .catch((err) => {
                notifyError(err?.data?.message || 'Something went wrong')
                console.log(err)
            })
            .finally(() => {
                setLoading(false)
            })
    }

    const verifyReturnPath = () => {
        setLoading(true)
        const response = Post(inboxwp.ajaxurl, {action: 'inboxwp_verify_return_path', hash: inboxwp.hash, domain_id: domain.ID});
        response.then((res) => {
            setDomain(res.data.domain)
            if (! res.data.domain.ReturnPathDomainVerified) {
                notifyWarning('InboxWP could not verify DNS records. Please make sure you have added the necessary DKIM and Return-Path DNS records to ensure effective email delivery')
            } else {
                navigate('/sending-signatures')
            }
        })
            .catch((err) => {
                console.log(err)
                notifyError(err?.data?.message || 'Something went wrong')
            })
            .finally(() => {
                setLoading(false)
            })
    }

    const copyCnameValue = (text) => {
        if (navigator.clipboard && navigator.clipboard.writeText) {
            navigator.clipboard.writeText(text)
                .then(() => {
                    notifySuccess('Text copied to clipboard!');
                })
                .catch((error) => {
                    console.error('Failed to copy text: ', error);
                });
        } else {
            fallbackCopyTextToClipboard(text);
        }
    }

    const fallbackCopyTextToClipboard = (text) => {
        const textArea = document.createElement('textarea');
        textArea.value = text;

        // Make sure it's out of the viewport to avoid rendering it.
        textArea.style.position = 'fixed';
        textArea.style.left = '-9999px';

        document.body.appendChild(textArea);
        textArea.select();

        try {
            document.execCommand('copy');
            notifySuccess('Text copied to clipboard!');
        } catch (error) {
            console.error('Fallback: Unable to copy text: ', error);
        }

        document.body.removeChild(textArea);
    };


    return (
        <DefaultLayout>
            <div className="inboxwp-w-full">
                <div className="inboxwp-font-bold inboxwp-mb-5">
                    <h1 className="inboxwp-text-3xl inboxwp-mb-5">DNS Settings</h1>
                    <div className="inboxwp-flex">
                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className={`inboxwp-w-7 inboxwp-h-7 inboxwp-mr-1 ${domain?.DKIMVerified ? 'inboxwp-text-green-500' : 'inboxwp-text-gray-400'}`}>
                            <path strokeLinecap="round" strokeLinejoin="round" d="M9 12.75L11.25 15 15 9.75M21 12c0 1.268-.63 2.39-1.593 3.068a3.745 3.745 0 01-1.043 3.296 3.745 3.745 0 01-3.296 1.043A3.745 3.745 0 0112 21c-1.268 0-2.39-.63-3.068-1.593a3.746 3.746 0 01-3.296-1.043 3.745 3.745 0 01-1.043-3.296A3.745 3.745 0 013 12c0-1.268.63-2.39 1.593-3.068a3.745 3.745 0 011.043-3.296 3.746 3.746 0 013.296-1.043A3.746 3.746 0 0112 3c1.268 0 2.39.63 3.068 1.593a3.746 3.746 0 013.296 1.043 3.746 3.746 0 011.043 3.296A3.745 3.745 0 0121 12z" />
                        </svg>
                        <p className="inboxwp-text-[19px] inboxwp-text-gray-950 inboxwp-font-bold">{domain?.Name}</p>
                    </div>
                </div>
                <div className="inboxwp-text-center inboxwp-mx-auto inboxwp-w-[60%]">
                    <p className="inboxwp-text-gray-700 inboxwp-font-bold inboxwp-text-lg">
                        Head over to your DNS provider and add DKIM and Return-Path DNS records to verify your domain and ensure effective delivery.
                    </p>
                </div>

                <div className='inboxwp-border inboxwp-rounded bg-[#fff] inboxwp-shadow inboxwp-mt-12'>
                    <div className="inboxwp-grid inboxwp-grid-cols-5 inboxwp-gap-4 inboxwp-w-full inboxwp-bg-gray-300 inboxwp-p-3 inboxwp-text-gray-600 inboxwp-text-[15px] inboxwp-font-bold">
                        <div></div>
                        <div>Hostname</div>
                        <div>Type</div>
                        <div>Add this value</div>
                        <div></div>
                    </div>
                    <div className="inboxwp-grid inboxwp-grid-cols-5 inboxwp-gap-4 inboxwp-w-full inboxwp-p-5 inboxwp-border-b">
                        <div className="inboxwp-flex">
                            <div className={`${domain?.DKIMVerified ? 'inboxwp-text-green-500' : 'inboxwp-text-gray-200'}`}>
                                {domain?.DKIMVerified ?
                                    (<svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="inboxwp-w-10 inboxwp-h-10">
                                        <path strokeLinecap="round" strokeLinejoin="round" d="M4.5 12.75l6 6 9-13.5" />
                                    </svg>)
                                    :
                                    (<svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="inboxwp-w-10 inboxwp-h-10">
                                        <path strokeLinecap="round" strokeLinejoin="round" d="M9.75 9.75l4.5 4.5m0-4.5l-4.5 4.5M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                                    </svg>)}
                            </div>
                            <div className="inboxwp-ml-1">
                                <p className="inboxwp-text-[15px] inboxwp-text-gray-950 inboxwp-font-bold">DKIM</p>
                                <p className={`${domain?.DKIMVerified ? 'inboxwp-text-green-500' : 'inboxwp-text-gray-400'}`}>Inactive</p>
                            </div>
                        </div>
                        <div className="inboxwp-break-words">{domain?.DKIMPendingHost}</div>
                        <div>TXT</div>
                        <Tooltip text={'Click to copy'} showAtTop={true}>
                            <div ref={dkimRef} onClick={()=>{copyCnameValue(domain?.DKIMPendingTextValue)}} className="inboxwp-break-words">{domain?.DKIMPendingTextValue}</div>
                        </Tooltip>
                        {domain?.DKIMVerified ? '' :
                        <>
                            {loading ? <div className={'inboxwp-text-center inboxwp-w-7 inboxwp-h-7 inboxwp-ml-24'}>
                                <LoadingIcon/>
                            </div> 
                                :
                            <div className="inboxwp-text-center">
                                <button
                                    type="button"
                                    className="inboxwp-rounded hover:inboxwp-cursor-pointer inboxwp-bg-indigo-600 inboxwp-px-3.5 inboxwp-py-2 inboxwp-text-sm inboxwp-font-semibold inboxwp-text-white inboxwp-shadow-sm hover:inboxwp-bg-indigo-500 hover:inboxwp-text-white focus-visible:inboxwp-text-white focus-visible:inboxwp-outline focus-visible:inboxwp-outline-2 focus-visible:inboxwp-outline-offset-2 focus-visible:inboxwp-outline-indigo-600"
                                    onClick={verifyDKIM}
                                    disabled={loading}
                                >
                                    Verify
                                </button>
                            </div>
                            }
                        </>
                        }
                    </div>
                    <div className="inboxwp-grid inboxwp-grid-cols-5 inboxwp-gap-4 inboxwp-w-full inboxwp-p-5 inboxwp-border-b">
                        <div className="inboxwp-flex">
                            <div className={`${domain?.ReturnPathDomainVerified ? 'inboxwp-text-green-500' : 'inboxwp-text-gray-200'}`}>
                                {domain?.ReturnPathDomainVerified ?
                                    (<svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="inboxwp-w-10 inboxwp-h-10">
                                        <path strokeLinecap="round" strokeLinejoin="round" d="M4.5 12.75l6 6 9-13.5" />
                                    </svg>)
                                    :
                                    (<svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="inboxwp-w-10 inboxwp-h-10">
                                        <path strokeLinecap="round" strokeLinejoin="round" d="M9.75 9.75l4.5 4.5m0-4.5l-4.5 4.5M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                                    </svg>)}
                            </div>
                            <div className="inboxwp-ml-1">
                                <p className="inboxwp-text-[15px] inboxwp-text-gray-950 inboxwp-font-bold">Return-Path</p>
                                <p className={`${domain?.ReturnPathDomainVerified ? 'inboxwp-text-green-500' : 'inboxwp-text-gray-400'}`}>
                                    {domain?.ReturnPathDomainVerified ? 'Verified' : 'Inactive'}
                                </p>
                            </div>
                        </div>
                        <div className="inboxwp-flex">
                            <p>pm-bounces</p>
                        </div>
                        <div>CNAME</div>

                        <Tooltip text="Click to copy">
                            <div ref={returnPathRef} onClick={()=>{copyCnameValue(domain?.ReturnPathDomainCNAMEValue)}} className="inboxwp-break-words">{domain?.ReturnPathDomainCNAMEValue}</div>
                        </Tooltip>

                        {domain?.ReturnPathDomainVerified ? '' :
                            <>
                            {loading ? <div className={'inboxwp-text-center inboxwp-w-7 inboxwp-h-7 inboxwp-ml-24'}>
                                    <LoadingIcon/>
                                </div>
                                :
                                <div className="inboxwp-text-center">
                                    <button
                                        type="button"
                                        className="inboxwp-rounded inboxwp-bg-indigo-600 inboxwp-px-3.5 inboxwp-py-2 inboxwp-text-sm inboxwp-font-semibold inboxwp-text-white inboxwp-shadow-sm hover:inboxwp-bg-indigo-500 hover:inboxwp-text-white focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
                                        onClick={verifyReturnPath}
                                        disabled={loading}
                                    >
                                        Verify
                                    </button>
                                </div>
                            }
                            </>
                        }
                    </div>
                </div>
            </div>
        </DefaultLayout>
    )
}
