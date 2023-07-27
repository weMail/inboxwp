import DefaultLayout from "../../layouts/DefaultLayout";
import Domain from "./Components/Domain";
import Signature from "./Components/Signature";
import React, {useEffect, useState} from "@wordpress/element";
import {Link} from "react-router-dom";
import useFetchSignature from "../../hooks/useFetchSignature";
import LoadingIcon from "./Components/LoadingIcon";
import {Post} from "../../core/Ajax";
import {useNavigate} from "react-router-dom";

export default function Index() {
    const navigate = useNavigate();
    const signatureAdded = (confirmed) => {
        Post(inboxwp.ajaxurl, {
            action: 'inboxwp_set_signature_added',
            hash: inboxwp.hash,
            confirmation: !!confirmed
        });
    }

    const domainAdded = () => {
        navigate(`/sending-signatures/create?domain_not_found=${true}`)
    }

    const {domain, signature, loading, setSignature, domainHasFetched, signatureHasFetched} = useFetchSignature();

    useEffect(() => {
        if (signatureHasFetched) {
            signatureAdded(signature?.Confirmed)
        }
        if (domainHasFetched && !domain) {
            domainAdded(true)
        }
    }, [domain, signature, domainHasFetched, signatureHasFetched])

    return (
        <DefaultLayout>
            <div className="inboxwp-w-full">
                {! (domain && signature) && !loading ? <div className={'inboxwp-w-[216px] inboxwp-text-end inboxwp-mb-3'}>
                    <a href={'admin.php?page=inboxwp#/sending-signatures/create'} type="button"
                        className="inboxwp-flex hover:inboxwp-text-[#6366F1] inboxwp-justify-end inboxwp-rounded-md inboxwp-bg-white inboxwp-px-3 inboxwp-py-2 inboxwp-text-sm inboxwp-font-medium inboxwp-text-[#6366F1] inboxwp-shadow-sm inboxwp-ring-1 inboxwp-ring-gray-300"
                    >
                        Add Domain or Signature
                        <div className={'inboxwp-ml-2.5 inboxwp-mt-1'}>
                            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={3} stroke="currentColor" className="inboxwp-w-4 inboxwp-h-4">
                                <path strokeLinecap="round" strokeLinejoin="round" d="M4.5 12h15m0 0l-6.75-6.75M19.5 12l-6.75 6.75" />
                            </svg>
                        </div>
                    </a>
                    </div> : ''}
                <div className="inboxwp-overflow-hidden inboxwp-p-5 inboxwp-bg-white inboxwp-shadow inboxwp-border sm:inboxwp-rounded inboxwp-mb-8">
                    {domain ? <Domain domain={domain}/> : ''}

                    {loading ?
                        <div className={'inboxwp-m-auto inboxwp-w-10'}>
                            <LoadingIcon/>
                        </div>
                        :
                        <hr className="inboxwp-border-gray-900 border-[1px] inboxwp-my-5" />
                    }

                    {signature ? <Signature signature={signature} setSignature={setSignature} DKIMVerified={domain?.DKIMVerified}/> : ''}

                    {domain?.Name && !signature ? (
                        <div>
                            <Link type="button"
                                  className="inboxwp-text-blue-700 hover:inboxwp-text-white inboxwp-border inboxwp-border-blue-700 hover:inboxwp-bg-blue-800 focus:inboxwp-ring-4 focus:inboxwp-outline-none focus:inboxwp-ring-blue-300 inboxwp-font-medium inboxwp-rounded-md inboxwp-text-sm inboxwp-px-5 inboxwp-py-1.5 inboxwp-text-center inboxwp-mr-2 inboxwp-mb-2 dark:inboxwp-border-blue-500 dark:inboxwp-text-blue-500 dark:hover:inboxwp-text-white dark:hover:inboxwp-bg-blue-500 dark:focus:inboxwp-ring-blue-800"
                                    to={`/sending-signatures/create?create_form=1`}
                            >
                                Add Signature
                            </Link>
                        </div>
                    ) : ''}
                </div>
            </div>
        </DefaultLayout>
    )
}