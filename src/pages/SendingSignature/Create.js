import React, {useEffect, useState} from "@wordpress/element";
import {Link, useLocation, useNavigate} from 'react-router-dom';
import DialogModal from "../../components/DialogModal";
import DefaultLayout from "../../layouts/DefaultLayout";
import DomainForm from "./Components/DomainForm";
import SignatureForm from "./Components/SingatureForm";
import {Post} from "../../core/Ajax";
import useFetchSignature from "../../hooks/useFetchSignature";
import LoadingIcon from "./Components/LoadingIcon";

export default function Create({site}) {
    const location = useLocation();
    const urlParams = new URLSearchParams(location.search);
    const [createSignature, setCreateSignature] = useState(!!urlParams.get('create_form'));
    const [addDomain, setAddDomain] = useState(false);
    const navigate = useNavigate();
    const {domain, signature, loading, domainHasFetched} = useFetchSignature();

    const verifyDomain = (data) => {
        const response = Post(inboxwp.ajaxurl, {domain: data.domain, action: 'inboxwp_add_domain', hash: inboxwp.hash});
        response.then(res => {
            navigate('/dns-settings');
            data.onSuccess(res.data)
        })
            .catch(err => {
                data.onError(err.data)
            })
    }

    const cancelDomainAdding = () => {
        setAddDomain(false);
    }

    return (
        <DefaultLayout>
            {!createSignature ? (
                    <div className="inboxwp-w-full">
                        <div className="">
                            <div className="inboxwp-flex inboxwp-justify-center inboxwp-space-x-5">
                                {domain || loading ? '' :
                                    <div
                                        className="inboxwp-max-w-md inboxwp-p-6 inboxwp-bg-white inboxwp-border inboxwp-border-gray-200 inboxwp-rounded-lg inboxwp-shadow dark:inboxwp-bg-gray-800 dark:inboxwp-border-gray-700">
                                        <a href="#">
                                            <h5 className="inboxwp-mb-2 inboxwp-text-2xl inboxwp-font-bold inboxwp-tracking-tight inboxwp-text-gray-900 dark:inboxwp-text-white">Send from <span className="inboxwp-bg-yellow-200 inboxwp-px-2 inboxwp-pb-1">any email address</span> on a domain</h5>
                                        </a>
                                        <p className="inboxwp-mb-3 inboxwp-font-normal inboxwp-text-gray-700 dark:inboxwp-text-gray-400">A more technical approach which requires that you verify your domain by adding a DKIM DNS record.</p>
                                        <button
                                            onClick={() => setAddDomain(true)}
                                            className="inboxwp-inline-flex inboxwp-items-center inboxwp-px-3 inboxwp-py-2 inboxwp-text-sm inboxwp-font-medium inboxwp-text-center inboxwp-text-white inboxwp-bg-blue-700 inboxwp-rounded-lg hover:inboxwp-bg-blue-800 focus:inboxwp-ring-4 focus:inboxwp-outline-none focus:inboxwp-ring-blue-300 dark:inboxwp-bg-blue-600 dark:hover:inboxwp-bg-blue-700 dark:focus:inboxwp-ring-blue-800">
                                            Add Domain
                                            <svg aria-hidden="true" className="inboxwp-w-4 inboxwp-h-4 inboxwp-ml-2 inboxwp--mr-1" fill="currentColor" viewBox="0 0 20 20"
                                                 xmlns="http://www.w3.org/2000/svg">
                                                <path fillRule="evenodd"
                                                      d="M10.293 3.293a1 1 0 011.414 0l6 6a1 1 0 010 1.414l-6 6a1 1 0 01-1.414-1.414L14.586 11H3a1 1 0 110-2h11.586l-4.293-4.293a1 1 0 010-1.414z"
                                                      clipRule="evenodd"></path>
                                            </svg>
                                        </button>
                                    </div>
                                }

                                { signature || loading ? '' :
                                    <div
                                        className="inboxwp-max-w-md inboxwp-p-6 inboxwp-bg-white inboxwp-border inboxwp-border-gray-200 inboxwp-rounded-lg inboxwp-shadow dark:inboxwp-bg-gray-800 dark:inboxwp-border-gray-700">
                                        <a href="#">
                                            <h5 className="inboxwp-mb-2 inboxwp-text-2xl inboxwp-font-bold inboxwp-tracking-tight inboxwp-text-gray-900 dark:inboxwp-text-white">Send from a <span className="inboxwp-bg-yellow-200 inboxwp-px-2 inboxwp-pb-1">single email address</span> on a domain</h5>
                                        </a>
                                        <p className="inboxwp-mb-3 inboxwp-font-normal inboxwp-text-gray-700 dark:inboxwp-text-gray-400">A less technical approach which requires that you confirm your email address by clicking a confirmation link.</p>
                                        <button
                                            onClick={() => setCreateSignature(true)}
                                            className="inboxwp-inline-flex inboxwp-items-center inboxwp-px-3 inboxwp-py-2 inboxwp-text-sm inboxwp-font-medium inboxwp-text-center inboxwp-text-white inboxwp-bg-blue-700 inboxwp-rounded-lg hover:inboxwp-bg-blue-800 focus:inboxwp-ring-4 focus:inboxwp-outline-none focus:inboxwp-ring-blue-300 dark:inboxwp-bg-blue-600 dark:hover:inboxwp-bg-blue-700 dark:focus:inboxwp-ring-blue-800">
                                            Add Sender Signature
                                            <svg aria-hidden="true" className="inboxwp-w-4 inboxwp-h-4 inboxwp-ml-2 inboxwp--mr-1" fill="currentColor" viewBox="0 0 20 20"
                                                 xmlns="http://www.w3.org/2000/svg">
                                                <path fillRule="evenodd"
                                                      d="M10.293 3.293a1 1 0 011.414 0l6 6a1 1 0 010 1.414l-6 6a1 1 0 01-1.414-1.414L14.586 11H3a1 1 0 110-2h11.586l-4.293-4.293a1 1 0 010-1.414z"
                                                      clipRule="evenodd"></path>
                                            </svg>
                                        </button>
                                    </div>
                                }
                            </div>

                            {loading ?
                                <div className={'inboxwp-m-auto inboxwp-w-10 inboxwp-mt-5'}>
                                    <LoadingIcon/>
                                </div>
                                :
                                ''
                            }

                            {(domainHasFetched && domain) ?
                                <div className="inboxwp-flex inboxwp-justify-center inboxwp-mt-12">
                                    <Link
                                        as={'button'}
                                        className="inboxwp-items-center inboxwp-text-blue-700 hover:inboxwp-text-white inboxwp-border inboxwp-border-blue-700 hover:inboxwp-bg-blue-800 focus:inboxwp-ring-4 focus:inboxwp-outline-none focus:inboxwp-ring-blue-300 inboxwp-font-medium inboxwp-rounded-lg inboxwp-text-sm inboxwp-px-10 inboxwp-py-2.5 inboxwp-text-center inboxwp-mr-2 inboxwp-mb-2 dark:inboxwp-border-blue-500 dark:inboxwp-text-blue-500 dark:hover:inboxwp-text-white dark:hover:inboxwp-bg-blue-500 dark:focus:inboxwp-ring-blue-800"
                                        to={'/sending-signatures'}
                                    >
                                        Cancel
                                    </Link>
                                </div>
                                :
                                ''
                            }
                        </div>
                    </div>
                )
                : (
                    <SignatureForm setCreateSignature={setCreateSignature} />
                )}

            <DialogModal isOpen={addDomain} maxWidth="md" onClose={cancelDomainAdding}>
                <DomainForm cancelDomainAdding={cancelDomainAdding} verifyDomain={verifyDomain} loading={loading}/>
            </DialogModal>
        </DefaultLayout>
    )
}
