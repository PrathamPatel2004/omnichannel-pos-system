import mongoose from 'mongoose';
import { Schema, type Document } from 'mongoose';

export interface IProducts extends Document {
    name: string;
    description: string;
    price: number;
    stockKeepingUnit: string;
    barcode: string;
    category: string;
    createdAt: Date;
}

const productsSchema = new Schema<IProducts>({
    name: { type: String, required: true },
    description: { type: String, required: true },
    price: { type: Number, required: true },
    stockKeepingUnit: { type: String, required: true, unique: true, index: true },
    barcode: { type: String, required: true, unique: true, sparse: true },
    category: { type: String, required: true },
}, { timestamps: true });

const ProductsModel = mongoose.model<IProducts>('Products', productsSchema);
export default ProductsModel;