import React from '@wordpress/element';
import 'notyf/notyf.min.css';
import { Notyf } from 'notyf';

const useNotification = (duration = 4500) => {
    const notyf = new Notyf({
        duration: duration,
        position: {
            x: 'right',
            y: 'bottom',
        },
        types: [
            {
                type: 'warning',
                background: 'orange',
                icon: false,
                dismissible: true,
            }
        ]
    });

    const notifySuccess = (title) => {
        notyf.success(title);
    }

    const notifyWarning = (title) => {
        // notyf.warning(title);
        notyf.open({
            type: 'warning',
            message: title,
        })
    }

    const notifyError = (title) => {
        notyf.error(title);
    }

    return {
        notifySuccess,
        notifyWarning,
        notifyError,
    }
}

export default useNotification;
