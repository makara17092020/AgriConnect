"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.errorHandler = void 0;
const errorHandler = (err, req, res, next) => {
    res.status(err.status || 400).json({
        success: false,
        message: err.message || "Something went wrong",
    });
};
exports.errorHandler = errorHandler;
//# sourceMappingURL=error.middleware.js.map