import React, {useState} from "@wordpress/element";
import SingleMailLog from "./SingleMailLog";
import MessageDetails from "./MessageDetails";

export default function LogCard({messages}) {
    const [viewDetails, setViewDetails] = useState(false)
    const [messageId, setMessageId] = useState('');

    const handleViewDetails = (messageId) => {
        setMessageId(messageId)
        setViewDetails(! viewDetails)
    }

    return (
        <div className="inboxwp-bg-white inboxwp-px-4 inboxwp-py-5 sm:inboxwp-px-6 inboxwp-mt-3 inboxwp-rounded-md inboxwp-space-y-4">
            {messages.map((message) => (
                <SingleMailLog key={message.MessageID} message={message} handleViewDetails={handleViewDetails}/>
            ))}

            <MessageDetails onClose={()=>setViewDetails(! viewDetails)} messageId={messageId} isOpen={viewDetails}/>
        </div>
    )
}
