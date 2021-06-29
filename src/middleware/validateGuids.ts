import { NextFunction, Request, Response } from "express"
import { getReasonPhrase, StatusCodes } from "http-status-codes"
import { isGuid } from "../helpers"
import { INVALID_ID } from "../const/errorMessages"

export function validateGuids (req: Request, res: Response, next: NextFunction) {
    for (const id in req.params) {
        if(!isGuid(req.params[id])){
            console.error(INVALID_ID)
            return res.status(StatusCodes.UNPROCESSABLE_ENTITY).json(getReasonPhrase(StatusCodes.UNPROCESSABLE_ENTITY))
        }
    }
    next()
}