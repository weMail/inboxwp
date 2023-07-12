import {Navigate, Outlet} from "react-router-dom";
import React from "@wordpress/element";
import {useState} from "react";

export default function PrivateOutlet({restAvailable, apiKey}) {
    return <Outlet/>;

    if (restAvailable === false) {
        return <Navigate to="/rest-warning"/>;
    }
    if (!apiKey) {
        return <Navigate to="/not-connected"/>;
    }

    return <Outlet/>;
}