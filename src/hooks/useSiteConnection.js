import {Post} from "../core/Ajax";

const useSiteConnection = (setLoading) => {
    const disconnectSite = () => {
        if (setLoading) {
            setLoading(true);
        }
        const response = Post(`${inboxwp.ajaxurl}`, {action: 'inboxwp_app_disconnect', hash: inboxwp.hash});
        response.then((res) => {
            if (res.success) {
                window.location.reload();
            } else {
                notifyError(res.data.message || 'Something went wrong!')
            }
        })
            .catch((err) => {
                console.log(err.response.data.message)
            })
            .finally(() => {
                if (setLoading) {
                    setLoading(true);
                }
            })
    }


    return {
        disconnectSite
    }
}

export default useSiteConnection;