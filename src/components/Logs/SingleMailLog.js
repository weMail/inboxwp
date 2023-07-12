import React, {useState} from '@wordpress/element'
import LogIcon from "../../icons/LogIcon";
import moment from "moment/moment";

export default function SingleMailLog({message, handleViewDetails}) {

    const [details, setDetails] = useState(false)

    return (
        <div className="inboxwp-flex inboxwp-space-x-3" onMouseEnter={()=>
            setDetails(true)} onMouseLeave={()=>setDetails(false)} onBlur={()=>setDetails(false)}>
            <div className="inboxwp-flex-shrink-0">
                <LogIcon/>
            </div>
            <p className="inboxwp-text-sm inboxwp-font-medium inboxwp-mt-3">
                {message.Subject || 'Subject Name'}
            </p>
            <p className="inboxwp-text-sm inboxwp-text-gray-500 inboxwp-mt-3">
                to {message.To.map((email) => email.Email) || 'email@example.com'}
            </p>
            <div className="">
                <p className={`text-sm inboxwp-text-gray-500 inboxwp-mt-3 inboxwp-px-3 py-[2px] inboxwp-font-medium inboxwp-rounded-full
      ${message.Status == 'Sent' ? 'text-[#065F46] bg-[#D5FFF2]' : 'inboxwp-text-red-800 bg-[#FEE2E2]'}`
                }>
                    {message.Status || 'Sent'}
                </p>
            </div>
            <p className="inboxwp-text-sm inboxwp-text-gray-500 inboxwp-mt-3">
                {moment(message.ReceivedAt).format('MMM DD, LT')}
            </p>
            {details ? <button
                type="button"
                className="inboxwp-rounded inboxwp-bg-indigo-50 inboxwp-px-2 inboxwp-py-1 inboxwp-text-xs inboxwp-font-semibold inboxwp-text-indigo-600 inboxwp-shadow-sm hover:inboxwp-bg-indigo-100"
                onClick={()=>handleViewDetails(message.MessageID)}
            >
                Details
            </button> : ''}
        </div>
    );
}
