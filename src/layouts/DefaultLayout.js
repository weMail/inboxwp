import TopFixedSection from "../components/Dashboard/TopFixedSection";
import React from "@wordpress/element";

export default function DefaultLayout({children}) {
    return (
        <>
            <TopFixedSection/>
            <div className="inboxwp-mr-[15px] inboxwp-py-2 inboxwp-pt-[80px]">

                {children}
            </div>
        </>
    );
}