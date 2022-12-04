import { _n } from '@wordpress/i18n';
import React from 'react';
import rest from '../core/REST';

class NotConnected extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            title: _n("Let’s connect your website with InboxWP", 'inboxwp'),
            subTitle: _n("Let MailSend take care of all emails that goes through your WordPress site. Power up your WordPress email game with just a few clicks", 'inboxwp'),
            buttonText: _n('Connect your website', 'inboxwp')
        }
    }

    connectSite() {
        rest.get(`${inboxwp.ajaxurl}?action=inboxwp_app_connection_url&hash=${inboxwp.hash}`)
            .then((res) => {
                window.location.href = res.data.data.url;
            })
            .catch((err) => {
                console.log(err.response.data.message)
            })
    }

    render() {
        return (
            <div className="wrap inboxwp-flex inboxwp-h-screen">
            <div className="inboxwp-text-center inboxwp-m-auto inboxwp-w-2/3">
                <svg className="inboxwp-mx-auto inboxwp-h-12 inboxwp-w-12 inboxwp-text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor" aria-hidden="true">
                    <path vectorEffect="non-scaling-stroke" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 13h6m-3-3v6m-9 1V7a2 2 0 012-2h6l2 2h6a2 2 0 012 2v8a2 2 0 01-2 2H5a2 2 0 01-2-2z" />
                </svg>
                <h3 className="inboxwp-mt-2 inboxwp-text-lg inboxwp-font-medium inboxwp-text-gray-900">{ this.state.title }</h3>
                <p className="inboxwp-mt-1 inboxwp-text-sm inboxwp-text-gray-500 inboxwp-px-48">{ this.state.subTitle }</p>
                <div className="inboxwp-mt-6">
                    {/* <form action="" method="post"> */}
                        <button onClick={this.connectSite} type="button" name="inboxwp-connect" className="inboxwp-inline-flex inboxwp-items-center inboxwp-rounded-md inboxwp-border inboxwp-border-transparent inboxwp-bg-indigo-600 inboxwp-px-4 inboxwp-py-2 inboxwp-text-sm inboxwp-font-medium inboxwp-text-white inboxwp-shadow-sm inboxwp-hover:bg-indigo-700 inboxwp-focus:outline-none inboxwp-focus:ring-2 inboxwp-focus:ring-indigo-500 inboxwp-focus:ring-offset-2">
                            { this.state.buttonText }
                        </button>
                    {/* </form> */}
                </div>
            </div>
        </div>
        );
    }
}

export default NotConnected;