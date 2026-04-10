import request from "supertest";

// Mock Auth Middleware
jest.mock("../middleware/auth.middleware", () => {
    const middleware = (req: any, res: any, next: any) => {
        req.user = { id: "userId", role: "admin" };
        next();
    };

    return {
        __esModule: true,
        default: middleware
    };
});

// Mock RBAC
jest.mock("../middleware/rbac.middleware", () => ({
    allowRoles: () => (req: any, res: any, next: any) => next()
}));

// Mock Store Model
jest.mock("../models/stores.model", () => ({
    __esModule: true,
    default: {
        find: jest.fn().mockReturnValue({
            skip: jest.fn().mockReturnValue({
                limit: jest.fn().mockReturnValue({
                    populate: jest.fn().mockResolvedValue([])
                })
            })
        }),

        countDocuments: jest.fn().mockResolvedValue(0),
        create: jest.fn().mockResolvedValue({ _id: "storeId" }),
        findByIdAndUpdate: jest.fn().mockResolvedValue({ _id: "storeId" }),
        findByIdAndDelete: jest.fn().mockResolvedValue({ _id: "storeId" })
    }
}));

describe("Store Controller", () => {
    let app: any;

    beforeAll(async () => {
        jest.resetModules();
        app = (await import("../app")).default;
    });

    describe("CreateStore", () => {
        it("should create store", async () => {
            const res = await request(app).post("/api/store/create-store").send({
                name: "Test Store",
                address: "Test Address",
                manager: "user1"
            });

            expect(res.status).toBe(201);
        });
    });

    describe("GetStore", () => {
        it("should get stores", async () => {
            const res = await request(app).get("/api/store/get-stores");
            expect(res.status).toBe(200);
        });
    });

    describe("UpdateStore", () => {
        it("should update store", async () => {
            const res = await request(app).patch("/api/store/store1/update-store").send({ address: "Updated Address" });
            expect(res.status).toBe(200);
        });
    });

    describe("DeleteStore", () => {
        it("should delete store", async () => {
            const res = await request(app).delete("/api/store/store1/delete-store");
            expect(res.status).toBe(200);
        });
    });
});