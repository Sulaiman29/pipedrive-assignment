import axios from 'axios';
import dotenv from 'dotenv';

dotenv.config();

const API_TOKEN = process.env.PIPEDRIVE_API_TOKEN;
const COMPANY_DOMAIN = process.env.PIPEDRIVE_COMPANY_DOMAIN;
const BASE_URL = `https://${COMPANY_DOMAIN}.pipedrive.com/api/v1/deals`;

const pipedriveApi = axios.create({
  baseURL: BASE_URL,
  params: {
    api_token: API_TOKEN
  }
});

export default pipedriveApi;
