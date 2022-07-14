import { Router } from "express";
import { validate } from 'express-validation';
import * as olxDataController from "../olxAggregator/olxOfferController";
import { catchErrors } from "../handlers/errorHandler";
import { olxOffer } from "../olxAggregator/olxOfferDTO";

const router = Router();

router.post(
    "/addOffer",
    validate(olxOffer, {}, {}),
    catchErrors(olxDataController.saveOffer)
);

export const rootRouter = router;
