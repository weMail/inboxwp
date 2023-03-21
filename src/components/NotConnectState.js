import { _n } from '@wordpress/i18n';
import rest from '../core/REST';


export default function NotConnected() {

    let title = _n("Let’s connect your website with InboxWP", 'inboxwp');
    let subTitle = _n("Let InboxWP take care of all your WordPress transactional emails 🚀", 'inboxwp');
    let buttonText = _n('Connect your website', 'inboxwp');

    const connectSite = () => {
        rest.get(`${inboxwp.ajaxurl}?action=inboxwp_app_connection_url&hash=${inboxwp.hash}`)
            .then((res) => {
                window.location.href = res.data.data.url;
            })
            .catch((err) => {
                console.log(err.response.data.message)
            })
    }

    return (
        <div className="wrap inboxwp-flex" style={{ minHeight: '80vh' }}>
            <div className="inboxwp-text-center inboxwp-m-auto inboxwp-w-2/3">
                <svg className="inboxwp-mx-auto inboxwp-h-12 inboxwp-w-12 inboxwp-text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor" aria-hidden="true">
                    <path vectorEffect="non-scaling-stroke" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 13h6m-3-3v6m-9 1V7a2 2 0 012-2h6l2 2h6a2 2 0 012 2v8a2 2 0 01-2 2H5a2 2 0 01-2-2z" />
                </svg>
                <h3 className="inboxwp-mt-2 inboxwp-text-lg inboxwp-font-medium inboxwp-text-gray-900">{ title }</h3>
                <p className="inboxwp-mt-1 inboxwp-text-sm inboxwp-text-gray-500 inboxwp-px-48">{ subTitle }</p>
                <div className="inboxwp-mt-6">
                    <button onClick={connectSite} type="button" name="inboxwp-connect" className="inboxwp-inline-flex inboxwp-items-center inboxwp-rounded-md inboxwp-border inboxwp-border-transparent inboxwp-bg-indigo-600 inboxwp-px-4 inboxwp-py-2 inboxwp-text-sm inboxwp-font-medium inboxwp-text-white inboxwp-shadow-sm hover:inboxwp-bg-indigo-700 focus:inboxwp-outline-none focus:inboxwp-ring-2 focus:inboxwp-ring-indigo-500 focus:inboxwp-ring-offset-2">
                        { buttonText }
                    </button>
                </div>
            </div>
        </div>
    );
}