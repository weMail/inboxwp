import React, {useState} from "@wordpress/element";
import Filter from "./Filter"
import {debounce} from "lodash";
import Axios from "axios";

const LogTopSection = () => {
    const [searchKey, setSearchKey] = useState();
    const handleSearchKey = debounce((e) => {
        const key = e.target.value;
        setSearchKey(key)
        fetchData({
            searchKey: key
        });
    }, 800);

    const [loading, setLoading] = useState(false)
    const fetchData = (data) => {
        setLoading(true);
        Axios.get(`${inboxwp.siteUrl}/${inboxwp.restPrefix}/inboxwp/v1/email/logs`, {
            headers: {
                'inboxwp-secret': inboxwp.siteHash
            },
            params: data
        })
            .then((res) => {
                if(res.data.success !== true) {
                    console.log(res.data)
                }
            })
            .finally(() => {
                setLoading(false)
            })
    }

    return (
        <div className="inboxwp-mt-4">
            <h1 className="inboxwp-text-gray-900 inboxwp-pt-5 inboxwp-text-base inboxwp-font-bold inboxwp-border-t">Latest Logs</h1>
            <div className="inboxwp-flex inboxwp-justify-between">
                <div className="inboxwp-relative inboxwp-mt-2 inboxwp-rounded-md inboxwp-w-[25%]">
                    <div className="inboxwp-pointer-events-none inboxwp-absolute inboxwp-inset-y-0 inboxwp-left-0 inboxwp-flex inboxwp-items-center inboxwp-pl-1">
                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="inboxwp-w-4 inboxwp-h-4 inboxwp-text-gray-500">
                            <path strokeLinecap="round" strokeLinejoin="round" d="M21 21l-5.197-5.197m0 0A7.5 7.5 0 105.196 5.196a7.5 7.5 0 0010.607 10.607z" />
                        </svg>

                    </div>
                    <input
                        type="email"
                        name="email"
                        onChange={handleSearchKey}
                        id="email"
                        className="inboxwp-block inboxwp-w-full !inboxwp-bg-inherit inboxwp-rounded-md active:!inboxwp-bg-inherit autofill:!inboxwp-bg-inherit focus-visible:!inboxwp-bg-inherit focus-visible:!inboxwp-border-0 !inboxwp-border-0 inboxwp-py-1.5 !inboxwp-pl-6 inboxwp-text-gray-900 inboxwp-ring-0 placeholder:inboxwp-text-gray-400 placeholder:inboxwp-text-[13px] focus:inboxwp-ring-0 focus:inboxwp-ring-inset focus:inboxwp-ring-gray-100 sm:inboxwp-text-sm sm:inboxwp-leading-6"
                        placeholder="Search email and subject"
                    />
                </div>
                <div className="w-32">
                    <Filter fetchData={fetchData}/>
                </div>
            </div>
        </div>
    );
}

export default LogTopSection;
