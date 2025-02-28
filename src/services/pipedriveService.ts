import axios from 'axios';
import dotenv from 'dotenv';

dotenv.config();

const API_TOKEN = process.env.PIPEDRIVE_API_TOKEN;
const BASE_URL = 'https://api.pipedrive.com/v1';

// Get all deals
export const getAllDeals = async () => {
  console.log('Fetching all deals from Pipedrive API');
  const response = await axios.get(`${BASE_URL}/deals`, {
    params: {
      api_token: API_TOKEN
    }
  });
  console.log(`Retrieved ${response.data.data ? response.data.data.length : 0} deals`);
  return response.data;
};

// Create a new deal
export const createDeal = async (dealData: any) => {
  console.log('Creating a new deal in Pipedrive', dealData);
  const response = await axios.post(`${BASE_URL}/deals`, dealData, {
    params: {
      api_token: API_TOKEN
    }
  });
  console.log(`Created deal with ID: ${response.data.data.id}`);
  return response.data;
};

// Update an existing deal
export const updateDeal = async (dealId: number, dealData: any) => {
  console.log(`Updating deal ${dealId} in Pipedrive`, dealData);
  const response = await axios.put(`${BASE_URL}/deals/${dealId}`, dealData, {
    params: {
      api_token: API_TOKEN
    }
  });
  console.log(`Updated deal with ID: ${dealId}`);
  return response.data;
};