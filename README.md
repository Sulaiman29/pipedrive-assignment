# Pipedrive API Proxy

A proxy application for the Pipedrive API with metrics tracking and CI/CD integration.

## Project Overview

This application provides a simple API that forwards requests to the Pipedrive API. It includes:

- Three endpoints for managing Pipedrive deals
- Request metrics tracking
- Comprehensive logging
- CI/CD pipeline with GitHub Actions
- Docker containerization

## Assignment Requirements

### Part I - API
- Implement GET /deals endpoint to retrieve all deals from Pipedrive
- Implement POST /deals endpoint to create new deals
- Implement PUT /deals endpoint to update existing deals

### Part II - Instrumentation
- Log all operations to console
- Provide a metrics endpoint for request statistics

### Part III & IV - CI/CD
- Set up GitHub Actions for testing and linting
- Create a deployment workflow

### Part V - Reproducibility
- Containerize the application with Docker
- Provide comprehensive documentation

## Getting Started

### Prerequisites
- Node.js (v16 or higher)
- npm
- Pipedrive API token