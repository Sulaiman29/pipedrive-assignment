# Pipedrive API Proxy

A proxy application for the Pipedrive API with metrics tracking and CI/CD integration.

## Project Overview

This application provides a simple API that forwards requests to the Pipedrive API. It includes:

- Three endpoints for managing Pipedrive deals
- Request metrics tracking
- Comprehensive logging
- CI/CD pipeline with GitHub Actions
- Docker containerization


## Prerequisites
- Node.js (v16 or higher)
- npm
- Docker and Docker Compose (for containerized deployment)
- Pipedrive API token

## HOW TO RUN THE APP LOCALLY WITH DOCKER
1. **Clone the Repository:**
    Open your terminal and run the following command to clone the repository from GitHub:
   ```bash
   git clone https://github.com/Sulaiman29/pipedrive-assignment.git
   cd pipedrive-assignment
   ```
   This will download the project files to your local machine and navigate into the project directory.

2. **Create a .env File:**
    In the root directory of the project, create a file named .env and add the following environment variables:
    ```bash
    PIPEDRIVE_API_TOKEN=2fcd62812055231302c5b1d6bcd0dd71e298cdd5
    PIPEDRIVE_COMPANY_DOMAIN=abc
    ```
    Replace the values with your actual Pipedrive API token and company domain if different.

3. **Build the Docker Image:**
    In your terminal, run the following command to build a Docker image for the application:
    
    ```bash
    docker build -t my-typescript-app .
    ```
    This command tells Docker to create an image named my-typescript-app using the instructions in the Dockerfile located in the current directory.

4. **Run the Docker Container:**
    Once the image is built, you can run it as a container using the following command:
    
    ```bash
    docker run --env-file .env -p 3000:3000 my-typescript-app
    ```
    This command starts a new container from the my-typescript-app image, maps port 3000 of the container to port 3000 on your local machine, and passes the environment variables from the .env file to the container.

5. **Access the Application:**

    Open your browser and navigate to http://localhost:3000 to access the application.

## Testing the APIs Using curl
You can use curl to test the API endpoints provided by the application. Here are some example commands:

### Get Deals:
```bash
curl --location --request GET 'http://localhost:3000/deals?api_token=<your_api_token>' \
--header 'Content-Type: application/json'
```
### Create a Deal:
```bash
curl --location --request POST 'http://localhost:3000/deals?api_token=<your_api_token>' \
--header 'Content-Type: application/json' \
--data '{
  "title": "New Deal",
  "value": 1000,
  "currency": "USD",
  "timestamp": 1738270723
}'
```
### Update a Deal:
```bash
curl --location --request PUT 'http://localhost:3000/deals/<deal_id>?api_token=<your_api_token>' \
--header 'Content-Type: application/json' \
--data '{
  "title": "Updated Deal",
  "value": 1500,
  "currency": "USD",
  "timestamp": 1738270723
}'
```

### Get Request Metrics:
```bash
curl --location 'http://localhost:3000/metrics'
```

## Stopping the Docker Container
When you're done using the application, you can stop the Docker container to free up resources.
1. **List Running Containers:**
    ```bash
    docker ps
    ```
2. **Stop the Container:**
    To stop the container, use the docker stop command followed by the container ID or name:
    ```bash
    docker stop <container_id_or_name>
    ```