import React from '@wordpress/element';
import Swal from "sweetalert2";

const useNotification = () => {
    const Toast = (title, icon = 'success') => {
        return Swal.mixin({
            showCancelButton: false,
            toast: true,
            position: 'top-end',
            timer: 3500,
            timerProgressBar: true,
            showConfirmButton: false,
            didOpen: (toast) => {
                toast.addEventListener('mouseenter', Swal.stopTimer)
                toast.addEventListener('mouseleave', Swal.resumeTimer)
            },
            customClass: {
                container: 'inboxwp-mt-7',
            }
        })
    }

    const notifySuccess = (title) => {
        return Toast().fire({
            icon: 'success',
            title: title,
        })
    }
    const notifyWarning = (title) => {
        return Toast().fire({
            icon: 'warning',
            title: title,
        })
    }

    const notifyError = (title) => {
        return Toast().fire({
            icon: 'error',
            title: title,
        })
    }

    return {
        notifySuccess,
        notifyWarning,
        notifyError,
    }
}

export default useNotification;
