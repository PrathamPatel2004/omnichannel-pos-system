import type { Config } from "jest";

const config: Config = {
    preset: "ts-jest",
    testEnvironment: "node",
    clearMocks: true,
    moduleFileExtensions: ["ts", "js"],
    testMatch: ["**/tests/**/*.test.ts"],
};

export default config;