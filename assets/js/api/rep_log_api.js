/**
 *
 * @param url
 * @param options
 * @returns {Promise<any>}
 */
function fetchJson(url, options) {
    return fetch(url, Object.assign({
        credentials: 'same-origin'
    }, options))
        .then(response => {
            return response.text()
                .then(text => text ? JSON.parse(text) : '');
        });
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
