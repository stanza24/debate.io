import mongoose from 'mongoose';
import type {IUser} from '../models/User';

const {Schema, model} = mongoose;

const UserSchema = new Schema<IUser>({
    role: {type: String, enum: ['USER', 'ADMIN'], default: 'USER', required: true},
    username: {type: String, required: true, unique: true},
    email: {type: String, required: true, unique: true},
    password: {type: String, required: true, unique: true},
    isVerified: {type: Boolean, default: false, required: true},
    // firstName: {type: String, required: true},
    // lastName: {type: String, required: true},
    // middleName: {type: String, required: true},
    // countryName: {type: String, required: true},
    // aboutMe: {type: String, required: true},
});

export default model<IUser>('User', UserSchema);
