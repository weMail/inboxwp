import {Navigate, Outlet, useLocation} from "react-router-dom";
import React from "@wordpress/element";
import {useState} from "react";

export default function PrivateOutlet({restAvailable}) {
    const location = useLocation();
    if (restAvailable === false) {
        return <Navigate to="/rest-warning"/>;
    }
    if (! inboxwp.is_connected) {
        return <Navigate to="/not-connected"/>;
    }

    return <Outlet/>;
}