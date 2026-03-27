import mongoose from 'mongoose';
import { Schema, type Document } from 'mongoose';

export interface IInventory extends Document {
    productVariantId: mongoose.Types.ObjectId;
    storeId: mongoose.Types.ObjectId;
    stock: number;
    reservedStock: number;
    reorderLevel: number;
    updatedAt: Date;
}

const inventorySchema = new Schema<IInventory>({
    productVariantId: { type: mongoose.Schema.Types.ObjectId, ref: 'ProductVariants', required: true },
    storeId: { type: mongoose.Schema.Types.ObjectId, ref: 'Stores', required: true },
    stock: { type: Number, required: true, default: 0 },
    reservedStock: { type: Number, required: true, default: 0 },
    reorderLevel: { type: Number, required: true, default: 10 },
    updatedAt: { type: Date, default: Date.now },
}, { timestamps: true });

inventorySchema.index({ productVariantId: 1, storeId: 1 }, { unique: true });
const InventoryModel = mongoose.model<IInventory>('Inventory', inventorySchema);
export default InventoryModel;