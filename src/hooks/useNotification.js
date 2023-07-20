import React from '@wordpress/element';
import 'notyf/notyf.min.css';
import { Notyf } from 'notyf';

const useNotification = () => {
    const notyf = new Notyf({
        duration: 4500,
        position: {
            x: 'right',
            y: 'bottom',
        },
    });

    const notifySuccess = (title) => {
        notyf.success(title);
    }

    const notifyWarning = (title) => {
        notyf.warning(title);
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
