import { createRoot } from '@wordpress/element';
import App from "./App";

/**
 * Import the stylesheet for the plugin.
 */
import './style/main.scss';

// Render the App component into the DOM
createRoot(document.getElementById('inboxwp-app')).render(<App />);