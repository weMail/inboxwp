import Axios from 'axios';

export default function HTTP(baseUrl, token) {
    return Axios.create({
        baseURL: baseUrl,
        timeout: 1000,
        headers: {'api-key': token}
    });
}