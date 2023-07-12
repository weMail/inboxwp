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

    const success = (title) => {
        return Toast().fire({
            icon: 'success',
            title: title,
        })
    }
    const warning = (title) => {
        return Toast().fire({
            icon: 'warning',
            title: title,
        })
    }

    const error = (title) => {
        return Toast().fire({
            icon: 'error',
            title: title,
        })
    }

    const notify = () => {
        return {
            success,
            warning,
            error
        }
    }

    return {
        notify
    }
}

export default useNotification;
