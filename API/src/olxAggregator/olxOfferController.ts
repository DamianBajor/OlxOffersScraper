import { OlxOfferModel } from "./OlxOfferModel";
import * as uuid from "innodb-optimized-uuid";
import { IOlxOffer } from "./olxOffer.interface";

export const saveOffer = async (req, res) => {
    const {title, price, location, url} = req.body;

    const offerID = uuid.generate();
    const offer: IOlxOffer = {
        offerID,
        title,
        price,
        location,
        url
    }

    await new OlxOfferModel(offer).save();

    res.status(200).json({message: "OK"})
}
