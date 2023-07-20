import DialogModal from "../DialogModal";
import {useEffect, useState} from "@wordpress/element";
import MessageSkeleton from "./MessageSkeleton";
import moment from 'moment/moment'
import axios from "axios";
import useNotification from "../../hooks/useNotification";
import API from "../../core/API";
import {Post} from "../../core/Ajax";

const MessageDetails = ({onClose, isOpen, messageId}) => {
    const [loading, setLoading] = useState(false);
    const [message, setMessage] = useState()
    const [error, setError] = useState('')
    const {notifyError} = useNotification();

    useEffect(()=>{
        if (isOpen) {
            setError('')
            setLoading(true);
            const response = Post(inboxwp.ajaxurl, {
                action: 'inboxwp_email_details',
                id: messageId,
                hash: inboxwp.hash
            });

            response.then((res) => {
                    setMessage(res.data)
                })
                .finally(() => {
                    setLoading(false)
                })
                .catch((err) => {
                    notifyError(err.data?.message || 'Something went wrong')
                    setError(err.data?.message || 'Something went wrong')
                })
        }
    }, [isOpen])

    return(
        <DialogModal maxWidth={loading ? '2xl' : '5xl'} isOpen={isOpen} onClose={onClose}>
            {
                error ? <div className="inboxwp-text-lg inboxwp-text-red-600 inboxwp-p-20 inboxwp-text-center">{error}</div>

                    :

                    <DialogModal.Content>
                        {loading ?
                            <div className="inboxwp-w-fit inboxwp-m-auto"><MessageSkeleton/></div>

                            :
                            <div className="inboxwp-py-5 inboxwp-px-4">
                                <p className="inboxwp-text-gray-500 inboxwp-text-sm">{moment(message?.ReceivedAt).format('MMM DD YYYY, LT')}</p>
                                <h1 className="inboxwp-mt-3 inboxwp-text-lg inboxwp-font-bold">{message?.Subject}</h1>
                                <div className="inboxwp-rounded inboxwp-shadow-sm inboxwp-border inboxwp-p-2 w-[40%] inboxwp-my-2">
                                    <p className="inboxwp-text-sm"><span className="inboxwp-font-bold">From :</span> <span className="inboxwp-text-gray-500">{message?.From}</span></p>
                                    <p className="inboxwp-text-sm"><span className="inboxwp-font-bold">To :</span> <span className="inboxwp-text-gray-500">{message?.Recipients?.join(', ')}</span></p>
                                </div>
                                <p className={`inboxwp-text-sm inboxwp-text-gray-500 inboxwp-mt-3 inboxwp-px-3 inboxwp-py-[2px] inboxwp-font-medium inboxwp-rounded-full inboxwp-w-fit inboxwp-mb-12 inboxwp-mt-8
          ${message?.Status == 'Sent' ? 'inboxwp-text-[#065F46] inboxwp-bg-[#D5FFF2]' : 'inboxwp-text-red-800 inboxwp-bg-[#FEE2E2]'}`
                                }>
                                    {message?.Status || 'Sent'}
                                </p>
                                <div dangerouslySetInnerHTML={{__html: message?.HtmlBody}}></div>

                                {
                                    message?.Attachments?.length > 0 ?
                                        <div className="inboxwp-mt-12">
                                            <span className="inboxwp-text-gray-500">Attachments : </span>
                                            <span>{message.Attachments.join(', ')}</span>
                                        </div>
                                        : ''
                                }

                                <div className="inboxwp-mt-9 inboxwp-border-t inboxwp-pt-9">
                                    <div className="inboxwp-text-gray-800 inboxwp-mb-5">Events </div>
                                    {
                                        message?.MessageEvents?.map((item, key)=> {
                                            return (
                                                <div key={key}>
                                                    <p className="inboxwp-mb-2">
                      <span className={`inboxwp-text-sm inboxwp-text-gray-500 inboxwp-mt-3 inboxwp-px-3 inboxwp-py-[2px] inboxwp-font-medium inboxwp-rounded-full inboxwp-w-fit inboxwp-mb-12 inboxwp-mt-8
                      ${['Delivered', 'Opened', 'LinkClicked'].includes(item.Type) ? 'inboxwp-text-[#065F46] inboxwp-bg-[#D5FFF2]' : 'inboxwp-text-red-800 inboxwp-bg-[#FEE2E2]'}`
                      }>{item.Type}</span>
                                                        <span className="inboxwp-pl-2 inboxwp-text-sm inboxwp-text-gray-500">{moment(item.ReceivedAt).format('MMM DD YYYY, LT')}</span>
                                                    </p>
                                                </div>
                                            )
                                        })
                                    }
                                </div>
                            </div>
                        }
                    </DialogModal.Content>
            }
        </DialogModal>
    );
}

export default MessageDetails;
