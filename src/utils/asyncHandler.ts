import { Request, Response } from 'express';

// Custom type for async route handlers
export type AsyncRouteHandler = (req: Request, res: Response) => Promise<any>;

// Helper function to wrap async handlers
export const asyncHandler = (fn: AsyncRouteHandler) => (req: Request, res: Response) => {
    return Promise.resolve(fn(req, res)).catch((error) => {
        console.error('Route error:', error.message);
        return res.status(500).json({ error: 'Server error' });
    });
};
