import common from "../../../common"
import config from "../../../config"

export default function fetchData(method, api, body) {
    api = config.API_BASE_URL + api;

    return new Promise((res, rej) => {
        var myHeaders = new Headers();
        const jwt = common.getCookieJWT();
        myHeaders.append("Authentication", "bearer " + jwt);
        myHeaders.append('Content-Type', 'application/json');

        var requestOptions = {
            method: String(method).toUpperCase(),
            headers: myHeaders,
            body: JSON.stringify(body),
            redirect: 'follow',
            credentials: 'include', // This is required to send cookies with the request
        };

        fetch(api, requestOptions)
            .then(async response => {
                if (response.ok) {
                    return response.json()
                }
                const data = await response.json();
                throw new Error(data.message)
            })
            .then(result => {
                // console.log(result);
                res(result);
            })
            .catch(error => {
                console.log(error)
                rej(error);
            });
    })
}