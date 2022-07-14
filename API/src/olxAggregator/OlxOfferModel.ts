import { model, Schema } from "mongoose";
import { IOlxOffer } from "./olxOffer.interface";

const OlxOfferSchema = new Schema<IOlxOffer>({
    offerID: {
        type: String,
        unique: true,
        required: true,
    },
    title: {
        type: String,
        required: true,
    },
    price: {
        type: Number,
    },
    location: {
        type: String,
    },
    url: {
        type: String
    }
});

export const OlxOfferModel = model("OlxOffer", OlxOfferSchema);
