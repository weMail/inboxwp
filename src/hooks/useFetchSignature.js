import {useEffect, useState} from "@wordpress/element";
import {Get} from "../core/Ajax";
import useNotification from "./useNotification";
import {useLocation} from "react-router-dom";

const useFetchSignature = () => {
    const location = useLocation();
    const urlParams = new URLSearchParams(location.search);
    const [domain, setDomain] = useState(null);
    const [signature, setSignature] = useState(null);
    const [loading, setLoading] = useState(false);
    const {notifyError} = useNotification();
    const [isFetchData] = useState(!urlParams.get('domain_not_found'));
    const [domainHasFetched, setDomainHasFetched] = useState(false);
    const [signatureHasFetched, setSignatureHasFetched] = useState(false);


    useEffect(() => {
        if (isFetchData) {
            fetchSignature()
        }
    }, [])

    const fetchSignature = () => {
        setLoading(true)
        const response = Get(`${inboxwp.ajaxurl}?action=inboxwp_get_signature&hash=${inboxwp.hash}`);
        response.then((res) => {
            setDomain(res.data.domain)
            setSignature(res.data.signature)
            setDomainHasFetched(true)
            setSignatureHasFetched(true)
        })
            .catch((err) => {
                console.log(err)
                notifyError(err?.data?.message || 'Something went wrong')
            })
            .finally(() => {
                setLoading(false)
            })
    }

    return {domain, signature, loading, setSignature, domainHasFetched, signatureHasFetched}
}

export default useFetchSignature;