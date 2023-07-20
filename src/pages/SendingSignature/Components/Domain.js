import {useState} from "@wordpress/element";
import LoadingIcon from "./LoadingIcon";
import DialogModal from "../../../components/DialogModal";
import SecondaryButton from "../../../Components/SecondaryButton";
import DangerButton from "../../../Components/DangerButton";
import classNames from "classnames";
import {Link} from "react-router-dom";
import useNotification from "../../../hooks/useNotification";
import {Post} from "../../../core/Ajax";
export default function Domain({domain}) {

    const [loading, setLoading] = useState(false);
    const [showDeleteModal, setShowDeleteModal] = useState(false);
    const {notifyError, notifySuccess} = useNotification();

    const handleDeleteModal = () => {
        setShowDeleteModal(! showDeleteModal);
    }

    const deleteSignature = () => {
        setLoading(true)
        const response = Post(inboxwp.ajaxurl, {action: 'inboxwp_delete_domain', hash: inboxwp.hash, domain_id: domain.ID});
        response.then((res) => {
            handleDeleteModal();
            notifySuccess(res.data.message || 'Domain deleted successfully');
            setTimeout(() => {
                window.location.reload();
            }, 1000)
        })
            .catch((err) => {
                notifyError(err?.data?.message || 'Something went wrong')
            })
            .finally(() => {
                setLoading(false)
            })
    }

    return (
        <div className="inboxwp-flex inboxwp-justify-between inboxwp-font-bold">
            <div className="inboxwp-flex">
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className={`inboxwp-w-6 inboxwp-h-6 inboxwp-mr-1 ${domain?.DKIMVerified ? 'inboxwp-text-green-500' : 'inboxwp-text-gray-300'}`}>
                    <path strokeLinecap="round" strokeLinejoin="round" d="M9 12.75L11.25 15 15 9.75M21 12c0 1.268-.63 2.39-1.593 3.068a3.745 3.745 0 01-1.043 3.296 3.745 3.745 0 01-3.296 1.043A3.745 3.745 0 0112 21c-1.268 0-2.39-.63-3.068-1.593a3.746 3.746 0 01-3.296-1.043 3.745 3.745 0 01-1.043-3.296A3.745 3.745 0 013 12c0-1.268.63-2.39 1.593-3.068a3.745 3.745 0 011.043-3.296 3.746 3.746 0 013.296-1.043A3.746 3.746 0 0112 3c1.268 0 2.39.63 3.068 1.593a3.746 3.746 0 013.296 1.043 3.746 3.746 0 011.043 3.296A3.745 3.745 0 0121 12z" />
                </svg>
                <p className="inboxwp-text-[15px] inboxwp-text-gray-900 inboxwp-font-bold">{domain?.Name}</p>
            </div>
            <div className={`inboxwp-flex ${domain?.DKIMVerified ? 'inboxwp-text-green-500' : 'inboxwp-text-red-600'}`}>

                <div className={`inboxwp-flex`}>
                    {domain?.DKIMVerified ?
                        <>
                            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="inboxwp-w-6 inboxwp-h-6">
                                <path strokeLinecap="round" strokeLinejoin="round" d="M4.5 12.75l6 6 9-13.5" />
                            </svg>
                            <p className="inboxwp-text-[15px] inboxwp-ml-1">DKIM Verified</p>
                        </>
                        :
                        <>
                            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="inboxwp-w-6 inboxwp-h-6">
                                <path strokeLinecap="round" strokeLinejoin="round" d="M9.75 9.75l4.5 4.5m0-4.5l-4.5 4.5M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                            </svg>
                            <p className="inboxwp-text-[15px] inboxwp-ml-1">DKIM Not Verified</p>
                        </>
                    }
                </div>

                <div className={`inboxwp-flex inboxwp-ml-3 ${domain?.ReturnPathDomainVerified ? 'inboxwp-text-green-500' : 'inboxwp-text-red-600'}`}>
                    {domain?.ReturnPathDomainVerified ?
                        <>
                            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="inboxwp-w-6 inboxwp-h-6">
                                <path strokeLinecap="round" strokeLinejoin="round" d="M4.5 12.75l6 6 9-13.5" />
                            </svg>
                            <p className={`inboxwp-text-[15px] inboxwp-ml-1`}>Return-Path Verified</p>
                        </>
                        :
                        <>
                            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="inboxwp-w-6 inboxwp-h-6">
                                <path strokeLinecap="round" strokeLinejoin="round" d="M9.75 9.75l4.5 4.5m0-4.5l-4.5 4.5M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                            </svg>
                            <p className={`inboxwp-text-[15px] inboxwp-ml-1`}>Return-Path Not Verified</p>
                        </>
                    }
                </div>

                <Link
                    to={`/dns-settings`}
                    className="inboxwp-text-[15px] inboxwp-ml-4 inboxwp-text-blue-700 inboxwp-underline"
                >
                    DNS Settings
                </Link>

                {loading ? <div className={'inboxwp-w-6 inboxwp-h-6 inboxwp-ml-4'}><LoadingIcon/></div> :
                    (<svg onClick={handleDeleteModal} xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="inboxwp-w-5 inboxwp-h-5 inboxwp-text-gray-400 inboxwp-ml-5 hover:inboxwp-text-gray-900 hover:inboxwp-cursor-pointer">
                        <path strokeLinecap="round" strokeLinejoin="round" d="M14.74 9l-.346 9m-4.788 0L9.26 9m9.968-3.21c.342.052.682.107 1.022.166m-1.022-.165L18.16 19.673a2.25 2.25 0 01-2.244 2.077H8.084a2.25 2.25 0 01-2.244-2.077L4.772 5.79m14.456 0a48.108 48.108 0 00-3.478-.397m-12 .562c.34-.059.68-.114 1.022-.165m0 0a48.11 48.11 0 013.478-.397m7.5 0v-.916c0-1.18-.91-2.164-2.09-2.201a51.964 51.964 0 00-3.32 0c-1.18.037-2.09 1.022-2.09 2.201v.916m7.5 0a48.667 48.667 0 00-7.5 0" />
                    </svg>)
                }

                <DialogModal isOpen={showDeleteModal} maxWidth="md" onClose={handleDeleteModal}>
                    <DialogModal.Content title="Delete domain">
                        <span className="inboxwp-text-yellow-600">You will no longer be able to send from this domain and all of its Sender Signatures will be removed. This cannot be undone.</span>
                    </DialogModal.Content>

                    <DialogModal.Footer>
                        <SecondaryButton onClick={handleDeleteModal}>Cancel</SecondaryButton>

                        <DangerButton
                            onClick={deleteSignature}
                            className={classNames('inboxwp-ml-2', { 'inboxwp-opacity-25': loading })}
                            // className={classNames('inboxwp-ml-2')}
                            disabled={loading}
                        >
                            Delete
                        </DangerButton>
                    </DialogModal.Footer>
                </DialogModal>

            </div>
        </div>
    )
}
