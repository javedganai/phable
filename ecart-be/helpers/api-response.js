"use strict";
class APIResponse {
    static jsonResponse(res, code, message, type, data) {
        let obj = { message, type };
        if (data) {
            obj['data'] = data;
        }
        return res.status(code).json(obj);
    }
    static ok(res, dto) {
        if (!!dto) {
            res.type('application/json');
            return res.status(200).json(dto);
        }
        else {
            return res.sendStatus(200);
        }
    }
    static successWithData(res, message, data) {
        return APIResponse.jsonResponse(res, 200, message, 'success', data);
    }
    static success(res, message) {
        return APIResponse.jsonResponse(res, 200, message, 'success');
    }
    static created(res) {
        return res.sendStatus(201);
    }
    static clientError(res, message) {
        return APIResponse.jsonResponse(res, 400, message ? message : 'Unauthorized', 'error');
    }
    static unauthorized(res, message) {
        return APIResponse.jsonResponse(res, 401, message ? message : 'Unauthorized', 'error');
    }
    static paymentRequired(res, message) {
        return APIResponse.jsonResponse(res, 402, message ? message : 'Payment required', 'error');
    }
    static forbidden(res, message) {
        email_controller_1.apiErrorEmail(res, message);
        return APIResponse.jsonResponse(res, 403, message ? message : 'Forbidden', 'error');
    }
    static notFound(res, message) {
        return APIResponse.jsonResponse(res, 404, message ? message : 'Not found', 'error');
    }
    static conflict(res, message) {
        return APIResponse.jsonResponse(res, 409, message ? message : 'Conflict', 'error');
    }
    static tooMany(res, message) {
        return APIResponse.jsonResponse(res, 429, message ? message : 'Too many requests', 'error');
    }
    static fail(res, error) {
        let errorMessage = null;
        if (process.env.ENV == 'production') {
            // apiErrorEmail(res, error);
        }
        else {
            console.error("ERROR", error);
            // process.exit(1);
        }
        if (error instanceof Error) {
            errorMessage = error.message ? error.message : '';
        }
        else {
            errorMessage = error;
        }
        console.log('the errrrrrrrrrrr', errorMessage);
        return APIResponse.jsonResponse(res, 500, errorMessage ? errorMessage : 'Too many requests', 'error');
    }
}
exports.default = APIResponse;
//# sourceMappingURL=api-response.js.map