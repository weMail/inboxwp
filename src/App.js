import React from '@wordpress/element';
import Home from './pages/Home/Index';
import Logs from './pages/Logs';
import {Navigate, Route, Routes} from "react-router-dom";
import NotFound from "./pages/404/NotFound";
import {useEffect, useState} from "@wordpress/element";
import Axios from "axios";
import RestWarning from "./components/RestWarning";
import NotConnected from "./components/NotConnectState";
import PrivateOutlet from "./routes/PrivateOutlet";
import SendingSignature from "./pages/SendingSignature/Index";
import SignatureCreate from "./pages/SendingSignature/Create";
const App = () => {
    const [apiKey, setApiKey] = useState('');
    const [restAvailable, setRestAvailable] = useState(true);

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


    useEffect(() => {
        isRestAvailable();
        setApiKey(inboxwp.apiKey)
    }, [inboxwp.apiKey]);


    return (
        <Routes>
            <Route element={<PrivateOutlet restAvailable={restAvailable} apiKey={apiKey} />} >
                <Route path="/" element={<Home />}/>
                <Route path="/logs" element={<Logs />}/>
                <Route path="/sending-signatures" element={<SendingSignature />}/>
                <Route path="/sending-signatures/create" element={<SignatureCreate />}/>
            </Route>
            <Route path="/not-connected" element={apiKey ? <Navigate to={'/'}/> : <NotConnected />}/>
            <Route path="/rest-warning" element={restAvailable ? <Navigate to={'/'}/> : <RestWarning />}/>
            <Route path="*" element={<NotFound/>}/>
        </Routes>
    );
}

export default App;