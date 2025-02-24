import rateLimit from "express-rate-limit";
import { ReasonPhrases } from "http-status-codes";

export const limiterRequests = rateLimit({
    windowMs: 15 * 60 * 1000,
    message: {
        status: ReasonPhrases.REQUEST_TIMEOUT,
        message: 'to many request, please try again later'
    },
    limit: 80,
    standardHeaders: true,
    legacyHeaders: false
})

export const limiterRequestsOtp = rateLimit({
    windowMs: 30 * 60 * 100,
    message: {
        status: ReasonPhrases.REQUEST_TIMEOUT,
        message: 'to many request, please try again later'
    },
    limit: 3,
    standardHeaders: true,
    legacyHeaders: false
})