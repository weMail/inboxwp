import {useEffect, useState} from "@wordpress/element";
import {Get} from "../core/Ajax";
import useNotification from "./useNotification";

const useFetchSignature = () => {
    const [domain, setDomain] = useState(null);
    const [signature, setSignature] = useState(null);
    const [loading, setLoading] = useState(false);
    const {notifyError} = useNotification();

    useEffect(() => {
        fetchSignature();
    }, [])

    const fetchSignature = () => {
        setLoading(true)
        const response = Get(`${inboxwp.ajaxurl}?action=inboxwp_get_signature&hash=${inboxwp.hash}`);
        response.then((res) => {
            setDomain(res.data.domain)
            setSignature(res.data.signature)
        })
            .catch((err) => {
                notifyError(err?.data?.message || 'Something went wrong')
            })
            .finally(() => {
                setLoading(false)
            })
    }

    return {domain, signature, loading, setSignature, fetchSignature}
}

export default useFetchSignature;