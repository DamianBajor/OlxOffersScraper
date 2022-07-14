import { ValidationError } from "express-validation";

export const catchErrors = (fn) => {
    return function (req, res, next) {
        return fn(req, res, next).catch(next);
    };
};

export const notFound = (req, res, next) => {
    const err = new Error("Not found");
    res.status(404).json({message: "Not found"});
    next(err);
};

export const validation = (err, req, res, next) => {
    if (err instanceof ValidationError) {
        return res.status(err.statusCode).json(err);
    }
    return res.status(500).json(err);
}
