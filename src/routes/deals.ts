import express, { Request, Response, NextFunction } from 'express';
import { getAllDeals, createDeal, updateDeal } from '../services/pipedrive.service';
import { asyncHandler } from '../utils/asyncHandler';

const router = express.Router();

// Middleware to validate deal ID
const validateDealId = (req: Request, res: Response, next: NextFunction) => {
    const dealId = parseInt(req.params.id, 10);
    if (isNaN(dealId)) {
        res.status(400).json({ error: 'Invalid deal ID' });
    } else {
        next();
    }
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

// PUT /deals/:id - updates an existing deal
router.put('/:id', validateDealId, asyncHandler(async (req: Request, res: Response) => {
    const dealId = parseInt(req.params.id, 10);
    const updatedDeal = await updateDeal(dealId, req.body);
    return res.json(updatedDeal);
}));

export default router;
