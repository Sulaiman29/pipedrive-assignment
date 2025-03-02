import express, { Request, Response } from 'express';
import { getAllDeals, createDeal, updateDeal } from '../services/pipedriveService';

const router = express.Router();

// Custom type for async route handlers
type AsyncRouteHandler = (req: Request, res: Response) => Promise<any>;

// Helper function to wrap async handlers
const asyncHandler = (fn: AsyncRouteHandler) => (req: Request, res: Response) => {
    return Promise.resolve(fn(req, res)).catch((error) => {
        console.error('Route error:', error.message);
        return res.status(500).json({ error: 'Server error' });
    });
};

// GET /deals - gets all deals
router.get('/', asyncHandler(async (req: Request, res: Response) => {
    const deals = await getAllDeals();
    return res.json(deals);
}));

// POST /deals - adds a new deal
router.post('/', asyncHandler(async (req: Request, res: Response) => {
    const newDeal = await createDeal(req.body);
    return res.status(201).json(newDeal);
}));

router.put('/:id', asyncHandler(async (req: Request, res: Response) => {
    const dealId = parseInt(req.params.id, 10);
    if (isNaN(dealId)) {
        return res.status(400).json({ error: 'Invalid deal ID' });
    }

    const updatedDeal = await updateDeal(dealId, req.body);
    return res.json(updatedDeal);
}));

export default router;