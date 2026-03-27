import type { Request, Response, NextFunction } from "express";

type Role = "admin" | "manager" | "cashier";

export const allowRoles = (...allowedRoles: Role[]) => {
    return (req: Request, res: Response, next: NextFunction) => {
        try {
            if (!req.user) {
                return res.status(401).json({ message: "Unauthorized" });
            }

            if (!allowedRoles.includes(req.user.role)) {
                return res.status(403).json({ message: "Forbidden. Access denied." })
            }

            next();
        } catch (error) {
            console.log(error);
            return res.status(500).json({ message: "Internal Server Error" });
        }
    }
}