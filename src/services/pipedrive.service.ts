import pipedriveApi from '../config/axios.instance';

// Get all deals
export const getAllDeals = async () => {
  console.log('Fetching all deals from Pipedrive API');
  const response = await pipedriveApi.get('');
  console.log(`Retrieved ${response.data.data ? response.data.data.length : 0} deals`);
  return response.data;
};

// Create a new deal
export const createDeal = async (dealData: any) => {
  console.log('Creating a new deal in Pipedrive', dealData);
  const response = await pipedriveApi.post('', dealData);
  console.log(`Created deal with ID: ${response.data.data.id}`);
  return response.data;
};

// Update an existing deal
export const updateDeal = async (dealId: number, dealData: any) => {
  console.log(`Updating deal ${dealId} in Pipedrive`, dealData);
  const response = await pipedriveApi.put(`/${dealId}`, dealData);
  console.log(`Updated deal with ID: ${dealId}`);
  return response.data;
};
