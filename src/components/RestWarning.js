import { _n } from '@wordpress/i18n';
import rest from '../core/REST';


export default function RestWarning({apiKey}) {

    let title = _n("Let’s connect your website with InboxWP", 'inboxwp');
    let subTitle = _n("Let InboxWP take care of all your WordPress transactional emails 🚀", 'inboxwp');

    return (
        <div className="wrap inboxwp-flex" style={{ minHeight: '80vh' }}>
            <div className="inboxwp-text-center inboxwp-m-auto inboxwp-w-2/3">
                {!apiKey && <>
                    <svg className="inboxwp-mx-auto inboxwp-h-12 inboxwp-w-12 inboxwp-text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor" aria-hidden="true">
                        <path vectorEffect="non-scaling-stroke" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 13h6m-3-3v6m-9 1V7a2 2 0 012-2h6l2 2h6a2 2 0 012 2v8a2 2 0 01-2 2H5a2 2 0 01-2-2z" />
                    </svg>
                    <h3 className="inboxwp-mt-2 inboxwp-text-lg inboxwp-font-medium inboxwp-text-gray-900">{ title }</h3>
                    <p className="inboxwp-mt-1 inboxwp-text-sm inboxwp-text-gray-500 inboxwp-px-48">{ subTitle }</p>
                </>}
                <div className="inboxwp-mt-6">
                    <p className="inboxwp-text-red-500 inboxwp-text-base">Seems you have not turned on REST API. Please turn on REST API to continue using InboxWP</p>
                </div>
            </div>
        </div>
    );
}