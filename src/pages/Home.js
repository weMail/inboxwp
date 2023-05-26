import { useEffect, useState, useRef } from 'react';
import Dashboard from '../components/Dashboard';
import NotConnected from '../components/NotConnectState';
import RestWarning from '../components/RestWarning';
import rest from '../core/REST';
import Axios from "axios";

export default function Home() {
    const [apiKey, setApiKey] = useState('');
    const [restAvailable, setRestAvailable] = useState(true);
    const [loading, setLoading] = useState(true);

    const checkSubscription = () => {
        rest.get(`${inboxwp.ajaxurl}?action=inboxwp_app_subscription_checking&hash=${inboxwp.hash}`)
            .then((res) => {
                if(res.data.success === false) {
                    return;
                }
                if(res.data.data.key) {
                    setApiKey(res.data.data.key)
                }
            })
            .finally(() => {
                // setLoading(false)
            })
            .catch((err) => {
                console.log(err)
            })
    }

    const isRestAvailable = () => {
        Axios.get(`${inboxwp.siteUrl}/${inboxwp.restPrefix}/inboxwp/v1/site/ping`, {
            headers: {
                'inboxwp-secret': inboxwp.siteHash
            }
        })
            .then((res) => {
                if(res.data.success !== true) {
                    setRestAvailable(false)
                }
            })
            .finally(() => {
                // setLoading(false)
            })
    }

    const updateApiKey = () => {
        setApiKey(null)
    }

    useEffect(() => {
        isRestAvailable();
        checkSubscription();
    }, []);

    if (restAvailable === false) {
        return <RestWarning apiKey={apiKey} />
    }
    if (!apiKey) {
        return  <NotConnected />
    }
    return <Dashboard onDisconnected={updateApiKey} />
}