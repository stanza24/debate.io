import mongoose from 'mongoose';
import type {ITokenSchema} from "../types/schema.types";

const {Schema, model} = mongoose;

const TokenSchema = new Schema({
    token: {type: String, required: true},
    userId: {type: mongoose.Schema.Types.ObjectId, ref: 'user'},
    // userAgentHash: {type: String, required: true, unique: true},
});

export default model<ITokenSchema>('Token', TokenSchema);
