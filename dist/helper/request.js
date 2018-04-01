/**
 * Checks if the request has an id
 *
 * @param req
 * @returns {boolean}
 * @private
 */
export const __requestHasId = req => {
    return req.params && req.params.id
}

/**
 * Get's the event id parameter
 *
 * @param req
 * @returns {null}
 * @private
 */
export const __getRequestId = req => {
    return __requestHasId(req) ? req.params.id : null
}

/**
 * Get's the correct payload depending on the request method
 *
 * @param event
 * @returns {*}
 * @private
 */
export const __getRequestPayload = event => {
    switch (event.httpMethod) {
        case 'POST':
        case 'PUT':
            return __body(event)
            break
        case 'DELETE':
        case 'GET':
            if (__hasId(event)) {
                return event.pathParameters.id
            }
            return event.query
            break
    }
}
