import rest from "../core/REST";
import MediaCard from "./MediaCard";
import React, {useEffect, useState} from 'react';
import Send from "../icons/Send"
import FailedMail from "../icons/FailedMail"
import SpamComplaint from "../icons/SpamComplaint"
import BarChart from "./BartChart";
import PieChart from "./PieChart";

export default function Dashboard({onDisconnected}) {
    const [loading, setLoading] = useState(true);
    const [stats, setStats] = useState({
        sent: {},
        bounce: {},
        spam: {},
    });
    const disconnectSite = () => {
        setLoading(true);
        rest.get(`${inboxwp.ajaxurl}?action=inboxwp_app_disconnect&hash=${inboxwp.hash}`)
            .then((res) => {
                if (res.data.success) {
                    onDisconnected()
                } else {
                    alert(res.data.data.message)
                }
            })
            .catch((err) => {
                console.log(err.response.data.message)
            })
            .finally(() => {
                setLoading(false)
            })
    }
    const getStats = () => {
        setLoading(true)
        rest.get(`${inboxwp.ajaxurl}?action=inboxwp_app_get_stats&hash=${inboxwp.hash}`)
            .then((res) => {
                if (res.data.success == false) {
                    return;
                }
                setStats(res.data.data);
            })
            .finally(() => {
                setLoading(false)
            })
            .catch((err) => {
                if (403 === err.response?.status) {
                    disconnectSite()
                } else {
                    console.log( err?.message || err )
                }
            })
    }

    useEffect(() => {
        getStats()
        return () => {
            setStats({})
        }
    }, [])

    return (
        <div className="inboxwp-mr-[15px] inboxwp-py-2">
            <div className="inboxwp-w-full inboxwp-flex inboxwp-justify-between">
                <div className="inboxwp-w-32">
                    <h2 className="inboxwp-text-lg">Dashboard</h2>
                </div>
                <div className="inboxwp-w-32">
                    <select
                        id="location"
                        name="location"
                        className="inboxwp-mt-1 inboxwp-block inboxwp-w-full inboxwp-rounded-md inboxwp-border-gray-300 inboxwp-pl-3 inboxwp-pr-10 inboxwp-text-base focus:inboxwp-border-indigo-500 focus:inboxwp-outline-none focus:inboxwp-ring-indigo-500 sm:inboxwp-text-sm inboxwp-text-red-800"
                        defaultValue="Canada"
                    >
                        <option>Monthly</option>
                        <option>Weekly</option>
                        <option>Daily</option>
                    </select>
                </div>
            </div>
            <div className="inboxwp-w-full inboxwp-flex inboxwp-space-x-4">
                <MediaCard className="inboxwp-w-1/3"
                           title="Delivered Emails"
                           loading={loading}
                           description={stats.sent?.Sent || 0}
                           image={<Send/>}
                />
                <MediaCard className="inboxwp-w-1/3" title="Hard Bounce" loading={loading} description={stats.bounce?.HardBounce || 0} image={<FailedMail/>}/>
                <MediaCard className="inboxwp-w-1/3" title="Spam Complaint" loading={loading} description={stats.spam?.SpamComplaint || 0} image={<SpamComplaint/>} border={false} />
            </div>
            <div className="inboxwp-flex inboxwp-justify-between inboxwp-space-x-4 inboxwp-min-h-[400px]">
                {/*<div className="inboxwp-w-[66.66%] inboxwp-p-3 inboxwp-bg-white inboxwp-rounded-lg inboxwp-my-4">*/}
                <div className="inboxwp-w-[66.66%] inboxwp-my-4">
                    <div className="inboxwp-min-h-[80%] inboxwp-rounded-t-lg inboxwp-relative inboxwp-bg-white">
                        <BarChart stats={stats} loading={loading}/>
                    </div>
                    <div className="inboxwp-flex inboxwp-h-[20%] inboxwp-bg-[#ebebebdf] inboxwp-rounded-b-lg inboxwp-p-5 inboxwp-justify-between">
                        <div>
                            <h2 className="inboxwp-text-[#111827] inboxwp-font-[500]">View detailed log</h2>
                            <p className="inboxwp-text-gray-500 inboxwp-text-[14px]">Explore email log in-depth of last 30 days</p>
                        </div>
                        <button type="button"
                                href="/logs"
                                className="inboxwp-inline-flex inboxwp-items-center inboxwp-rounded-md inboxwp-border inboxwp-border-transparent inboxwp-bg-gray-700 inboxwp-px-3 inboxwp-py-2 inboxwp-text-sm inboxwp-font-medium inboxwp-leading-4 inboxwp-text-white inboxwp-shadow-sm hover:inboxwp-bg-gray-600 focus:inboxwp-outline-none focus:inboxwp-ring-2 focus:inboxwp-ring-gray-500 focus:inboxwp-ring-offset-2">
                            View all log
                            <svg className="inboxwp-ml-2" width="15" height="20" viewBox="0 0 15 20" fill="none" xmlns="http://www.w3.org/2000/svg">
                                <path d="M10.7574 5.75738C10.3668 5.36686 9.73366 5.36686 9.34314 5.75738C8.95261 6.14791 8.95261 6.78107 9.34314 7.1716L11.1716 9.00002L2.27207 9.00002C1.71979 9.00002 1.27207 9.44774 1.27207 10C1.27207 10.5523 1.71979 11 2.27207 11L11.1716 11L9.34314 12.8284C8.95261 13.219 8.95261 13.8521 9.34314 14.2427C9.73366 14.6332 10.3668 14.6332 10.7574 14.2427L14.2929 10.7071C14.6834 10.3166 14.6834 9.68344 14.2929 9.29292L10.7574 5.75738Z" fill="white"/>
                            </svg>
                        </button>
                    </div>
                </div>
                <div className="inboxwp-w-[32.77%] inboxwp-p-3 inboxwp-bg-white inboxwp-rounded-lg inboxwp-my-4">
                    <PieChart sent={stats.sent?.Sent} bounce={stats.bounce?.HardBounce} loading={loading}/>
                </div>
            </div>
            <div
                className="inboxwp-bg-white inboxwp-flex inboxwp-justify-between inboxwp-my-2 inboxwp-rounded-lg inboxwp-p-6">
                <div className=" inboxwp-text-gray-900">
                    <h2 className="inboxwp-mt-2 inboxwp-text-lg inboxwp-font-medium">Disconnect your site</h2>
                    <p>Disconnect you site from inboxwp app. If you want to cancel your subscription please go to <a
                        className="inboxwp-text-blue-500" href={inboxwp.appUrl + '/dashboard'}>dashboard of InboxWP
                        app</a></p>
                </div>
                <div className="inboxwp-p-2">
                    <button
                        className="hover:inboxwp-cursor-pointer inboxwp-inline-flex inboxwp-items-center inboxwp-rounded-md inboxwp-border inboxwp-border-transparent inboxwp-bg-red-100 inboxwp-px-4 inboxwp-py-2 inboxwp-text-sm inboxwp-font-medium inboxwp-text-red-700 inboxwp-shadow-sm hover:inboxwp-bg-red-300 focus:inboxwp-outline-none focus:inboxwp-ring-2 focus:inboxwp-ring-red-300 focus:inboxwp-ring-offset-2"
                        onClick={disconnectSite}
                        disabled={loading}
                    >
                        Disconnect
                    </button>
                </div>
            </div>
        </div>
    );
}