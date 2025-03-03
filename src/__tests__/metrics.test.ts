import request from 'supertest';
import app from '../app';
import { metricsCollector } from '../utils/metrics';

// Mock the metrics collector
jest.mock('../utils/metrics', () => ({
  metricsCollector: {
    recordRequest: jest.fn(),
    getMetrics: jest.fn().mockReturnValue({
      overall: {
        totalRequests: 10,
        meanDuration: 25,
        minDuration: 5,
        maxDuration: 100
      },
      endpoints: {
        'GET /deals': {
          requests: 5,
          meanDuration: 20,
          minDuration: 5,
          maxDuration: 50,
          lastAccessed: '2023-01-01T00:00:00.000Z'
        }
      }
    })
  }
}));

describe('Metrics API', () => {
  it('should return metrics data', async () => {
    // Act
    const response = await request(app).get('/metrics');
    
    // Assert
    expect(response.status).toBe(200);
    expect(response.body).toHaveProperty('overall');
    expect(response.body).toHaveProperty('endpoints');
    expect(response.body.overall).toHaveProperty('totalRequests', 10);
    expect(metricsCollector.getMetrics).toHaveBeenCalledTimes(1);
  });
});