import React from '@wordpress/element';
import Home from './pages/Home';
import Logs from './pages/Logs';
import {Route, Routes} from "react-router-dom";
import NotFound from "./components/404/NotFound";
const App = () => {
    return (
        <Routes>
            <Route path="/" element={<Home />}/>
            <Route path="/logs" element={<Logs />}/>
            <Route path="*" element={<NotFound/>}/>
        </Routes>
    );
}

export default App;