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
    const [isConnected, setIsConnected] = useState('');
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
        setIsConnected(inboxwp.is_connected)
    }, [inboxwp.is_connected]);

    return (
        <Routes>
            <Route element={<PrivateOutlet restAvailable={restAvailable} isConnected={isConnected} />} >
                <Route path="/" element={<Home />}/>
                <Route path="/logs" element={<Logs />}/>
                <Route path="/sending-signatures" element={<SendingSignature />}/>
                <Route path="/sending-signatures/create" element={<SignatureCreate />}/>
            </Route>
            <Route path="/not-connected" element={
                restAvailable ? isConnected ? <Navigate to={'/'}/> : <NotConnected /> : <Navigate to={'/rest-warning'}/>
            }/>
            <Route path="/rest-warning" element={restAvailable ? <Navigate to={'/'}/> : <RestWarning isConnected={isConnected} />}/>
            <Route path="*" element={<NotFound/>}/>
        </Routes>
    );
}

export default App;