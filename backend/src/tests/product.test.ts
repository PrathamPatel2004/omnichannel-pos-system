import { createProduct, getProducts } from "../controllers/product.controller";
import ProductsModel from "../models/products.model";
import ProductVariantsModel from "../models/productVariants.model";

jest.mock("../models/products.model");
jest.mock("../models/productVariants.model");

describe("Product Controller", () => {
    describe("CreateProduct", () => {
        it("should create a new product and variant", async () => {
            const req = {
                body: {
                    name: "Shirt",
                    description: "Cotton Shirt",
                    category: "Clothing",
                    variants: [{ sku: "SKU1", price: 100, barcode: "123" }]
                }
            } as any;

            const res = {
                status: jest.fn().mockReturnThis(),
                json: jest.fn()
            } as any;

            (ProductsModel.create as jest.Mock).mockResolvedValue({
                _id: "productId",
                ...req.body
            });

            (ProductVariantsModel.insertMany as jest.Mock).mockResolvedValue([
                { _id: "variantId", productId: "productId" }
            ]);

            await createProduct(req, res);

            expect(ProductsModel.create).toHaveBeenCalled();
            expect(ProductVariantsModel.insertMany).toHaveBeenCalled();
            expect(res.status).toHaveBeenCalledWith(201);
        });
    });

    describe("GetProducts", () => {
        it("should return products with variants", async () => {
            const req = {} as any;
            const res = {
                status: jest.fn().mockReturnThis(),
                json: jest.fn()
            } as any;

            const mockProducts = [{
                _id: "productId",
                name: "Shirt",
                category: "Clothing"
            }];

            const mockVariants = [{
                _id: "variantId",
                productId: "productId",
                sku: "SKU1"
            }];

            (ProductsModel.find as jest.Mock).mockReturnValue({
                lean: jest.fn().mockResolvedValue(mockProducts)
            });

            (ProductVariantsModel.find as jest.Mock).mockReturnValue({
                lean: jest.fn().mockResolvedValue(mockVariants)
            });

            await getProducts(req, res);

            expect(ProductsModel.find).toHaveBeenCalled();
            expect(ProductVariantsModel.find).toHaveBeenCalled();
            expect(res.status).toHaveBeenCalledWith(200);
        });
    });
});