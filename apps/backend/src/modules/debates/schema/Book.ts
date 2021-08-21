import mongoose from 'mongoose';

interface IBook {
    _id: string;
    name: string;
    written: string;
}

const {Schema, model} = mongoose;

const BookSchema = new Schema<IBook>({
    name: {type: String, required: true, unique: true},
    written: {type: String, required: true},
});

export default model<IBook>('Book', BookSchema);
