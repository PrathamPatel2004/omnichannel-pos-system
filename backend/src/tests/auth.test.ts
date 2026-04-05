// Mock Auth Middleware
jest.mock("../middleware/auth.middleware", () => {
    const middleware = (req: any, res: any, next: any) => {
        req.user = { id: "userId", role: "admin" };
        next();
    };

    return {
        __esModule: true,
        default: middleware,
        authMiddleware: middleware
    };
});

// Mock Auth Service
jest.mock("../services/auth.service", () => ({
    verifyUserTokenService: jest.fn()
}));

// Mock User Model
jest.mock("../models/user.model", () => ({
    __esModule: true,
    default: {
        findOne: jest.fn(),
        create: jest.fn()
    }
}));

// Mock User Token Model
jest.mock("../models/userToken.model", () => {
    return {
        __esModule: true,
        default: {
            create: jest.fn().mockResolvedValue({}),
            findOne: jest.fn().mockResolvedValue({}),
            deleteOne: jest.fn().mockResolvedValue({})
        }
    };
});

// Mock Bcrypt
jest.mock("bcryptjs", () => ({
    compare: jest.fn().mockResolvedValue(true)
}));

// Mock JsonWebToken
jest.mock("jsonwebtoken", () => ({
    sign: jest.fn().mockReturnValue("fakeToken"),
    verify: jest.fn().mockReturnValue({ id: "userId" })
}));

import request from "supertest";
import app from "../app";
import UserModel from "../models/user.model";
import UserTokenModel from "../models/userToken.model";
import { verifyUserTokenService } from "../services/auth.service";

describe("Auth Controller", () => {
    const user = {
        email: "test@test.com",
        password: "123456",
        fname: "John",
        lname: "Doe"
    };
    let token: string;

    beforeAll(() => {
        process.env.FRONTEND_URL = "http://localhost:5173";
    });
    
    describe("Signup", () => {
        it("should create user", async () => {

            (UserModel.findOne as jest.Mock).mockResolvedValue(null);
            (UserModel.create as jest.Mock).mockResolvedValue({
                _id: "userId",
                ...user
            });

            const res = await request(app).post("/api/auth/signup").send(user);

            expect(res.status).toBe(201);
        });
    });

    describe("Verify Token", () => {
        it("should verify token", async () => {
            const res = await request(app).get("/api/auth/verify/fakeToken");

        });
    });

    describe("Login", () => {
        it("should login user", async () => {

            (UserModel.findOne as jest.Mock).mockResolvedValue({
                _id: "userId",
                hashPassword: "hashed",
                isActive: true,
                ...user
            });

            const res = await request(app).post("/api/auth/login").send({
                email: user.email,
                password: user.password
            });

            token = res.body.accessToken || "fakeToken";

            expect(res.status).toBe(200);
        });
    });

    describe("Logout", () => {
        it("should logout user", async () => {
            const res = await request(app).post("/api/auth/logout").set("Cookie", ["refreshToken=fakeRefreshToken"]);

            expect(res.status).toBe(200);
        });
    });
});