import type { Request, Response } from "express";
import mongoose from "mongoose";
import InventoryModel from "../models/inventory.model.js";
import InventoryLedgerModel from "../models/inventoryLedger.model.js";

export const createInventory = async (req: Request, res: Response) => {
    try {
        const { productVariantId, storeId, stock, reservedStock, reorderLevel } = req.body;

        const existingInventory = await InventoryModel.findOne({ productVariantId, storeId });
        if (existingInventory) {
            return res.status(400).json({ message: "Inventory for this product variant and store already exists" });
        }

        const inventory = InventoryModel.create({ productVariantId, storeId, stock, reservedStock, reorderLevel });
        return res.status(201).json({ message: "Inventory created successfully", inventory });
    } catch (err) {
        console.error(err);
        return res.status(500).json({ message: "Internal Server Error" });
    }
}

export const getInventory = async (req: Request, res: Response) => {
    try {
        const storeId = req.params.storeId as string ;
        
        const inventory = await InventoryModel.find({ storeId }).populate({ path: "productVariantId", populate: { path: "productId" } });
        return res.status(200).json({ inventory });
    } catch (err) {
        console.error(err);
        return res.status(500).json({ message: "Internal Server Error" });
    }
}

export const getInventoryByProductVariant = async (req: Request, res: Response) => {
    try {
        const variantId = req.params.variantId as string;
        const storeId = req.params.storeId as string;

        const inventory = await InventoryModel.findOne({ productVariantId: variantId, storeId }).populate({ path: "productVariantId", populate: { path: "productId" } });
    
        if (!inventory) {
            return res.status(404).json({ message: "Inventory not found" });
        }
        return res.status(200).json({ inventory });
    } catch (err) {
        console.error(err);
        return res.status(500).json({ message: "Internal Server Error" });
    }
}

export const updateInventoryStock = async (req: Request, res: Response) => {
    try {
        const variantId = req.params.variantId as string;
        const storeId = req.params.storeId as string;
        const { quantity } = req.body;

        if (!req.user) {
            return res.status(401).json({ message: "Unauthorized" });
        }

        const inventory = await InventoryModel.findOne({ productVariantId: variantId, storeId });

        if (!inventory) {
            return res.status(404).json({ message: "Inventory not found" });
        }

        const oldQuantity = inventory.stock;
        const newQuantity = oldQuantity + quantity;

        inventory.stock = newQuantity;
        await inventory.save();

        await InventoryLedgerModel.create({
            storeId,
            productVariantId: variantId,
            changeType: 'adjustment',
            quantityChange: quantity,
            oldQuantity,
            newQuantity: oldQuantity + quantity,
            referenceId: new mongoose.Types.ObjectId(),
            referenceType: 'Adjustment',
            issuedBy: req.user.id
        })
        return res.status(200).json({ message: "Inventory updated successfully", inventory: { ...inventory.toObject(), stock: oldQuantity + quantity } });
    } catch (err) {
        console.error(err);
        return res.status(500).json({ message: "Internal Server Error" });
    }
}

export const inventoryReservedStock = async (req: Request, res: Response) => {
    try {
        const variantId = req.params.variantId as string;
        const storeId = req.params.storeId as string;
        const { quantity } = req.body;

        const inventory = await InventoryModel.findOne({ productVariantId: variantId, storeId });

        if (!inventory) {
            return res.status(404).json({ message: "Inventory not found" });
        }
        if (inventory.stock < quantity) {
            return res.status(400).json({ message: "Not enough stock available" });
        }

        inventory.stock -= quantity;
        inventory.reservedStock += quantity;

        await inventory.save();
        return res.status(200).json({ message: "Stock reserved successfully", inventory });
    } catch (err) {
        console.error(err);
        return res.status(500).json({ message: "Internal Server Error" });
    }
}

// inventory Reserved Stock Release endpoint

// inventory final sale endpoint - reduces reserved stock and creates inventory ledger entry

// low stock notification alert endpoint

// get inventory ledger history endpoint

// barcode scanning endpoint - use of kafka service for integration with barcode scanning devices/system

