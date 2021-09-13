import mongoose from 'mongoose';
import type {IUser} from '../types/user.types';

const {Schema, model} = mongoose;

const UserSchema = new Schema<IUser>({
    role: {type: String, enum: ['USER', 'ADMIN'], default: 'USER', required: true},
    username: {type: String, required: true, unique: true},
    email: {type: String, required: true, unique: true},
    password: {type: String, required: true, unique: true},
    isActivate: {type: Boolean, default: false, required: true},
});

export default model<IUser>('User', UserSchema);
