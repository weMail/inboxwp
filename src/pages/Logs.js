import React, {useEffect, useState} from '@wordpress/element';
import BarChart from "../components/BarChart";
import Stats from "../components/Logs/Stats";
import BottomTopSection from "../components/Logs/BottomTopSection";
import LogCard from "../components/Logs/LogCard";
import useNotification from "../hooks/useNotification";
import DefaultLayout from "../layouts/DefaultLayout";
import {Get, Post} from "../core/Ajax";

export default function Logs() {
    const [loading, setLoading] = useState(true);
    const {notifyError, notifyWarning} = useNotification();
    const [stats, setStats] = useState({
        sent: {},
        bounce: {},
        spam: {},
    });
    const [logs, setLogs] = useState({
        logs: {},
    });
    const getStats = async () => {
        setLoading(true)
        const response = Get(`${inboxwp.ajaxurl}?action=inboxwp_get_stats&hash=${inboxwp.hash}`);
        response.then((res) => {
            setStats(res.data)
        }).catch((err) => {
            notifyError(err.data.message || 'Something went wrong')
        }).finally(() => {
            setLoading(false)
        })

    }

    const getLogs = (data) => {
        const response = Post(inboxwp.ajaxurl, {action: 'inboxwp_email_logs', hash: inboxwp.hash, ...data});
        response.then((res) => {
            setLogs(res.data.logs)
        })
            .catch((err) => {
                notifyError(err.data.message || 'Something went wrong')
            })
    }

    useEffect(() => {
        getStats()
        getLogs({})
        return () => {
            setStats({})
        }
    }, [])

    return (
        <DefaultLayout>
            <div className="">
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
                <BottomTopSection fetchData={getLogs}/>
                {logs?.Messages ? <LogCard messages={logs.Messages}/> : ''}
            </div>
        </DefaultLayout>
    );
}