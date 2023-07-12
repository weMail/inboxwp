import React from '@wordpress/element';
import {Link} from "react-router-dom";

const NotFoundPage = () => {
    return (
        <div className="inboxwp-flex inboxwp-flex-col inboxwp-items-center inboxwp-justify-center inboxwp-h-screen inboxwp-bg-gray-100">
            <h1 className="inboxwp-text-6xl inboxwp-font-bold inboxwp-text-red-500 inboxwp-mb-6">404</h1>
            <p className="inboxwp-text-2xl inboxwp-text-gray-600 inboxwp-mb-8">Page not found</p>
            <Link to="/home" className="inboxwp-text-lg inboxwp-text-blue-500 inboxwp-underline">
                Go back to homepage
            </Link>
        </div>
    );
};

export default NotFoundPage;
