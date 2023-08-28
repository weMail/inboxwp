import http from './HTTP';

const Ajax = http('http://appsero.test/wp-json/inboxwp/v1');

export default Ajax;

const $ = window.jQuery;

const Post = (url, data) => {

    return new Promise((resolve, reject) => {
        $.ajax({
            url: url,
            method: 'POST',
            data: data,
            success: function (response) {
                resolve(response);
            },
            error: function (jqXHR, textStatus, errorThrown) {
                if (jqXHR.status === 403) {
                    setTimeout(() => {
                        window.location.reload();
                    }, 1000);
                }

                reject(jqXHR.responseJSON);
            },

        });
    });
}

const Get = (url) => {
    return new Promise((resolve, reject) => {
        $.ajax({
            url: url,
            method: 'GET',
            success: function (response) {
                resolve(response);
            },
            error: function (jqXHR, textStatus, errorThrown) {
                if (jqXHR.status === 403) {
                    setTimeout(() => {
                        window.location.reload();
                    }, 1000);
                }

                reject(jqXHR.responseJSON);
            }
        });
    });
}

export {
    Post,
    Get
};