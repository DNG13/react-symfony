/**
 *
 * @param url
 * @param options
 * @returns {Promise<any>}
 */
function fetchJson(url, options) {
    let headers = {'Content-Type': 'application/json'};
    if (options && options.headers) {
        headers = { ...options.headers, headers};
        delete options.headers;
    }
    return fetch(url, Object.assign({
        credentials: 'same-origin',
        headers: headers
    }, options))
        .then(checkStatus)
        .then(response => {
            return response.text()
                .then(text => text ? JSON.parse(text) : '');
        });
}

/**
 *
 * @param response
 * @returns {*}
 */
function checkStatus(response) {
    if (response.status >= 200 && response.status < 400) {
        return response;
    }

    const error = new Error(response.statusText);
    error.response = response;

    throw error
}

/**
 *
 * @returns {Promise<any>}
 */
export function getRepLogs() {
    return fetchJson('/reps')
        .then((data) => data.items);
}

/**
 *
 * @param id
 * @returns {Promise<Response>}
 */
export function deleteRepLog(id) {
    return fetchJson(`/reps/${id}`, {
        method: 'DELETE'
    })
}

/**
 *
 * @param repLog
 * @returns {Promise<*>}
 */
export function createRepLog(repLog) {
    return fetchJson(`/reps`, {
        method: 'POST',
        body: JSON.stringify(repLog),
        headers: {
            'Content-Type': 'application/json'
        }
    })
}
