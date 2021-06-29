import camelcaseKeys from "camelcase-keys"
import { NextFunction, Request, Response } from "express"

export function processBody (req: Request, res: Response, next: NextFunction) {
    req.body = camelcaseKeys(req.body, {deep: true})
    next()
}