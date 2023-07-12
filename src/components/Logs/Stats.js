import Send from "../../icons/Send";
import MediaCard from "../MediaCard";
import React from "@wordpress/element";
import FailedMail from "../../icons/FailedMail";
import SpamComplaint from "../../icons/SpamComplaint";

export default function Stats({stats, loading}) {
    return (
        <div className="inboxwp-w-full inboxwp-flex inboxwp-space-x-4">
            <MediaCard className="inboxwp-w-1/4"
                       title="Delivered Emails"
                       loading={loading}
                       description={stats.sent?.Sent || 0}
                       image={<Send/>}
            />
            <MediaCard className="inboxwp-w-1/4" title="Hard Bounce" loading={loading} description={stats.bounce?.HardBounce || 0} image={<FailedMail/>}/>
            <MediaCard className="inboxwp-w-1/4" title="Spam Complaint" loading={loading} description={stats.spam?.SpamComplaint || 0} image={<SpamComplaint/>} border={false} />
            <MediaCard className="inboxwp-w-1/4" title="Soft Bounce" loading={loading} description={stats.spam?.SpamComplaint || 0} image={<FailedMail/>} border={false} />
        </div>
    )
}