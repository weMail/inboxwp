import {Navigate, Outlet} from "react-router-dom";
import React from "@wordpress/element";
import {useState} from "react";

export default function PrivateOutlet({restAvailable, isConnected}) {
    if (restAvailable === false) {
        return <Navigate to="/rest-warning"/>;
    }
    if (!isConnected) {
        return <Navigate to="/not-connected"/>;
    }

    return <Outlet/>;
}