const errorHandler = (err, ctx) => {
    // If the error is a 404, then we send a 404 status code and a message
    if (err.status === 404) {
        ctx.response.status = 404;
        ctx.response.body = { error: err.message };
    }

    // If the error is a 401, then we send a 401 status code and a message
    if (err.status === 401) {
        ctx.response.status = 401;
        ctx.response.body = { error: 'Unauthorized' };
    }

    // If the error is a 403, then we send a 403 status code and a message
    if (err.status === 403) {
        ctx.response.status = 403;
        ctx.response.body = { error: 'Forbidden' };
    }

    // If the error is a 400, then we send a 400 status code and a message
    if (err.status === 400) {
        ctx.response.status = 400;
        ctx.response.body = { error: 'Bad request' };
    }

    // If the error is a 500, then we send a 500 status code and a message

    if (err.status === 500) {
        ctx.response.status = 500;
        ctx.response.body = { error: 'Internal server error' };
    }

    // If the error is a 503, then we send a 503 status code and a message
    if (err.status === 503) {
        ctx.response.status = 503;
        ctx.response.body = { error: 'Service unavailable' };
    }

    // If the error is a 504, then we send a 504 status code and a message
    if (err.status === 504) {
        ctx.response.status = 504;
        ctx.response.body = { error: 'Gateway timeout' };
    }

    // If the error is a 502, then we send a 502 status code and a message
    if (err.status === 502) {
        ctx.response.status = 502;
        ctx.response.body = { error: 'Bad gateway' };
    }

    // If the error is a 501, then we send a 501 status code and a message
    if (err.status === 501) {
        ctx.response.status = 501;
        ctx.response.body = { error: 'Not implemented' };
    }

    // If the error is a 422, then we send a 422 status code and a message
    if (err.status === 422) {
        ctx.response.status = 422;
        ctx.response.body = { error: 'Unprocessable entity' };
    }

    // If the error is a 409, then we send a 409 status code and a message
    if (err.status === 409) {
        ctx.response.status = 409;
        ctx.response.body = { error: 'Conflict' };
    }

    // If the error is a 406, then we send a 406 status code and a message
    if (err.status === 406) {
        ctx.response.status = 406;
        ctx.response.body = { error: 'Not acceptable' };
    }

    // If the error is a 405, then we send a 405 status code and a message
    if (err.status === 405) {
        ctx.response.status = 405;
        ctx.response.body = { error: 'Method not allowed' };
    }

    // If the error is a 402, then we send a 402 status code and a message
    if (err.status === 402) {
        ctx.response.status = 402;
        ctx.response.body = { error: 'Payment required' };
    }

    // If the error is a 400, then we send a 400 status code and a message
    if (err.status === 400) {
        ctx.response.status = 400;
        ctx.response.body = { error: 'Bad request' };
    }

    // If the error is a 408, then we send a 408 status code and a message
    if (err.status === 408) {
        ctx.response.status = 408;
        ctx.response.body = { error: 'Request timeout' };
    }

    // If the error is a 410, then we send a 410 status code and a message
    if (err.status === 410) {
        ctx.response.status = 410;
        ctx.response.body = { error: 'Gone' };
    }

    // If the error is a 411, then we send a 411 status code and a message
    if (err.status === 411) {
        ctx.response.status = 411;
        ctx.response.body = { error: 'Length required' };
    }

    // If the error is a 412, then we send a 412 status code and a message
    if (err.status === 412) {
        ctx.response.status = 412;
        ctx.response.body = { error: 'Precondition failed' };
    }

    // If the error is a 413, then we send a 413 status code and a message
    if (err.status === 413) {
        ctx.response.status = 413;
        ctx.response.body = { error: 'Payload too large' };
    }

    // If the error is a 414, then we send a 414 status code and a message
    if (err.status === 414) {
        ctx.response.status = 414;
        ctx.response.body = { error: 'URI too long' };
    }

    // If the error is a 415, then we send a 415 status code and a message
    if (err.status === 415) {
        ctx.response.status = 415;
        ctx.response.body = { error: 'Unsupported media type' };
    }

    // If the error is a 416, then we send a 416 status code and a message
    if (err.status === 416) {
        ctx.response.status = 416;
        ctx.response.body = { error: 'Range not satisfiable' };
    }

    // If the error is a 417, then we send a 417 status code and a message
    if (err.status === 417) {
        ctx.response.status = 417;
        ctx.response.body = { error: 'Expectation failed' };
    }
};

module.exports = errorHandler;