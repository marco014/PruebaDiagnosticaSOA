import mongoose, { Schema, Document } from 'mongoose';

export interface FlowerDocument extends Document {
    _id: mongoose.Schema.Types.ObjectId;
    name: string;
    description: string;
    price: number;
    image: string;
}

const FlowerSchema: Schema = new Schema({
    name: { type: String, required: true },
    description: { type: String, required: true },
    price: { type: Number, required: true },
    image: { type: String, required: true },
});

export const FlowerModel = mongoose.model<FlowerDocument>('flowers', FlowerSchema);