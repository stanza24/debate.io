import mongoose from 'mongoose';

const {Schema, model} = mongoose;

const RefreshTokenSchema = new Schema<{token: string; userId: string}>({
    token: {type: String, required: true},
    userId: {type: mongoose.Schema.Types.ObjectId, ref: 'user'},
});

export default model<{token: string; userId: string}>('RefreshToken', RefreshTokenSchema);
