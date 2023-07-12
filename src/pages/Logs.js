import React, {useEffect, useState} from '@wordpress/element';
import BarChart from "../components/BarChart";
import Stats from "../components/Logs/Stats";
import BottomTopSection from "../components/Logs/BottomTopSection";
import LogCard from "../components/Logs/LogCard";
import Axios from "axios";
import useNotification from "../hooks/useNotification";

export default function Logs({onDisconnected}) {
    const [loading, setLoading] = useState(true);
    const {notifyError, notifyWarning} = useNotification();
    const [stats, setStats] = useState({
        sent: {},
        bounce: {},
        spam: {},
        logs: {},
    });
    const getStats = () => {
        setLoading(true)

        Axios.get(`${inboxwp.siteUrl}/${inboxwp.restPrefix}/inboxwp/v1/email/logs`, {
            headers: {
                'inboxwp-secret': inboxwp.siteHash
            },
            params: {

            }
        })
            .then((res) => {
                if(res.data.success !== true) {
                    notifyWarning(res.data.data.message || 'Something went wrong!')
                    return;
                }
                setStats(res.data.data?.logs);
            })
            .finally(() => {
                setLoading(false)
            })
            .catch((err) => {
                if (403 === err.response?.status) {
                    notifyError(err.response.data.data.message || 'Something went wrong!')
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
            <div className="inboxwp-flex inboxwp-justify-between">
                <h2 className="inboxwp-font-bold inboxwp-text-lg">Logs</h2>
                <div className="inboxwp-w-32">
                    <select
                        id="location"
                        name="location"
                        className="inboxwp-mt-1 inboxwp-block inboxwp-w-full inboxwp-rounded-md inboxwp-border-gray-300 inboxwp-py-2 inboxwp-pl-3 inboxwp-pr-10 inboxwp-text-base focus:inboxwp-border-indigo-500 focus:inboxwp-outline-none focus:inboxwp-ring-indigo-500 sm:inboxwp-text-sm"
                        defaultValue="Canada"
                    >
                        <option>All</option>
                        <option>Delivered</option>
                        <option>Bounced</option>
                        <option>Soft Bounce</option>
                        <option>Sent</option>
                    </select>
                </div>
            </div>
            <div className="inboxwp-w-full inboxwp-flex inboxwp-space-x-4">
                <Stats stats={stats} loading={loading}/>
            </div>
            <div className="inboxwp-flex inboxwp-justify-between inboxwp-space-x-4 inboxwp-min-h-[400px]">
                <div className="inboxwp-w-full inboxwp-my-4">
                    <div className="inboxwp-min-h-[100%] inboxwp-rounded-t-lg inboxwp-relative inboxwp-bg-white">
                        <BarChart stats={stats} loading={loading}/>
                    </div>
                </div>
            </div>
            <BottomTopSection/>
            {stats.logs?.Messages ? <LogCard messages={stats.logs.Messages}/> : ''}
        </div>
    );
}