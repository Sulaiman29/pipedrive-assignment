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

// PUT /deals - updates an already existing deal
router.put('/', asyncHandler(async (req: Request, res: Response) => {
  if (!req.body.id) {
    return res.status(400).json({ error: 'Deal ID is required' });
  }
  
  const updatedDeal = await updateDeal(req.body.id, req.body);
  return res.json(updatedDeal);
}));

export default router;