import {createRoot, StrictMode} from '@wordpress/element';
import App from "./App";
/**
 * Import the stylesheet for the plugin.
 */
import './style/main.scss';
import {BrowserRouter, HashRouter} from "react-router-dom";



// Render the App component into the DOM
createRoot(document.getElementById('inboxwp-app')).render(
    <StrictMode>
        <HashRouter>
            <App />
        </HashRouter>
    </StrictMode>

);