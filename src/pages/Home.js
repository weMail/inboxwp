import { useEffect, useState } from 'react';
import Dashboard from '../components/Dashboard';
import NotConnected from '../components/NotConnectState';
import rest from '../core/REST';

export default function Home() {
    const [apiKey, setApiKey] = useState('');
    const [loading, setLoading] = useState(true);

    const connectSite = () => {
        rest.get(`${inboxwp.ajaxurl}?action=inboxwp_app_subscription_checking&hash=${inboxwp.hash}`)
            .then((res) => {
                if(res.data.success == false) {
                    return;
                }
                if(res.data.data.key) {
                    setApiKey(res.data.data.key)
                }
            })
            .finally(() => {
                setLoading(false)
            })
            .catch((err) => {
                console.log(err)
            })
    }

    const updateApiKey = () => {
        setApiKey(null)
    }

    useEffect(() => {
        connectSite();
    }, []);

    if(loading) {
        return <>Loadding ........</>
    } else if (! loading && !apiKey) {
        return  <NotConnected />
    }
    return <Dashboard onDisconnected={updateApiKey} />
}