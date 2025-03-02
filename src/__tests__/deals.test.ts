import request from 'supertest';
import app from '../app';
import { getAllDeals, createDeal, updateDeal } from '../services/pipedriveService';

// Mock the Pipedrive service
jest.mock('axios');
jest.mock('../services/pipedriveService');

describe('Deals API', () => {
  beforeEach(() => {
    jest.resetAllMocks();
  });

  describe('GET /deals', () => {
    it('should return all deals', async () => {
      // Arrange
      const mockDeals = {
        success: true,
        data: [
          { id: 1, title: 'Test Deal 1', value: 1000 },
          { id: 2, title: 'Test Deal 2', value: 2000 }
        ]
      };
      (getAllDeals as jest.Mock).mockResolvedValue(mockDeals);

      // Act
      const response = await request(app).get('/deals');

      // Assert
      expect(response.status).toBe(200);
      expect(response.body).toEqual(mockDeals);
      expect(getAllDeals).toHaveBeenCalledTimes(1);
    });

    it('should handle errors when fetching deals fails', async () => {
      // Arrange
      (getAllDeals as jest.Mock).mockRejectedValue(new Error('API Error'));

      // Act
      const response = await request(app).get('/deals');

      // Assert
      expect(response.status).toBe(500);
      expect(response.body).toHaveProperty('error');
      expect(getAllDeals).toHaveBeenCalledTimes(1);
    });
  });

  describe('POST /deals', () => {
    it('should create a new deal', async () => {
      // Arrange
      const newDeal = { title: 'New Deal', value: 1000 };
      const createdDeal = {
        success: true,
        data: { id: 1, ...newDeal }
      };
      (createDeal as jest.Mock).mockResolvedValue(createdDeal);

      // Act
      const response = await request(app)
        .post('/deals')
        .send(newDeal);

      // Assert
      expect(response.status).toBe(201);
      expect(response.body).toEqual(createdDeal);
      expect(createDeal).toHaveBeenCalledWith(newDeal);
    });

    it('should handle errors when creating a deal fails', async () => {
      // Arrange
      const newDeal = { title: 'New Deal', value: 1000 };
      (createDeal as jest.Mock).mockRejectedValue(new Error('API Error'));

      // Act
      const response = await request(app)
        .post('/deals')
        .send(newDeal);

      // Assert
      expect(response.status).toBe(500);
      expect(response.body).toHaveProperty('error');
      expect(createDeal).toHaveBeenCalledWith(newDeal);
    });
  });

  describe('PUT /deals/:id', () => {
    it('should update an existing deal', async () => {
      // Arrange
      const dealId = 1;
      const dealUpdate = { title: 'Updated Deal', value: 2000 };
      const updatedDeal = {
        success: true,
        data: { id: dealId, ...dealUpdate },
      };
      (updateDeal as jest.Mock).mockResolvedValue(updatedDeal);

      // Act
      const response = await request(app)
        .put(`/deals/${dealId}`)
        .send(dealUpdate);

      // Assert
      expect(response.status).toBe(200);
      expect(response.body).toEqual(updatedDeal);
      expect(updateDeal).toHaveBeenCalledWith(dealId, dealUpdate);
    });

    it('should return 400 if invalid ID is provided', async () => {
      // Arrange
      const invalidId = 'invalid';
      const dealUpdate = { title: 'Updated Deal', value: 2000 };

      // Act
      const response = await request(app)
        .put(`/deals/${invalidId}`)
        .send(dealUpdate);

      // Assert
      expect(response.status).toBe(400);
      expect(response.body).toHaveProperty('error', 'Invalid deal ID');
      expect(updateDeal).not.toHaveBeenCalled();
    });

    it('should handle errors when updating a deal fails', async () => {
      // Arrange
      const dealId = 1;
      const dealUpdate = { title: 'Updated Deal', value: 2000 };
      (updateDeal as jest.Mock).mockRejectedValue(new Error('API Error'));

      // Act
      const response = await request(app)
        .put(`/deals/${dealId}`)
        .send(dealUpdate);

      // Assert
      expect(response.status).toBe(500);
      expect(response.body).toHaveProperty('error', 'Server error');
      expect(updateDeal).toHaveBeenCalledWith(dealId, dealUpdate);
    });
  });
});