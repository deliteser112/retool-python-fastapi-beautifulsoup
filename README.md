# Real Estate Listings Scraper

## Overview
This project is a web application that allows users to scrape real estate listings from Realtor.com by entering a zip code. The application displays the results in a table and provides filtering options based on listing price and number of beds. The frontend is built with React, Next.js, TypeScript, and Tailwind CSS, while the backend is implemented using Python and FastAPI.

## Features
- **Scraping**: Fetches real estate listings from Realtor.com based on the zip code.
- **Filtering**: Allows users to filter listings by minimum price, maximum price, and number of beds.
- **Real-time Updates**: Provides real-time updates on the scraping progress using Server-Sent Events (SSE).
- **Pagination**: Supports pagination of the listings to improve usability

## Technologies Used
- **Frontend**: React, Next.js, TypeScript, Tailwind CSS
- **Backend**: Python, FastAPI, BeautifulSoup, requests
- **Real-time Communication**: Server-Sent Events (SSE)

## Getting Started
### Prerequisites
- Node.js (v14 or later)
- Python (v3.7 or later)
- pip (Python package installer)

### Installation
1. Clone the repository:
    ```bash
    git clone https://github.com/deliteser112/real-estate-listings-scraper.git
    cd real-estate-listings-scraper
    ```

2. Frontend Setup:

    Navigate to the `retool-app` directory and install dependencies:

    ```bash
    cd retool-app
    npm install
    ```
    Create a .env file in the frontend directory with the following content:
    ```bash
    NEXT_PUBLIC_API_URL=http://127.0.0.1:8000
    ```

3. Backend Setup:
    
    Navigate to the `server` directory and create a virtual environment:

    ```bash
    cd server
    python -m venv venv
    source venv/bin/activate  # On Windows, use `venv\Scripts\activate`
    ```

    Install dependencies:
    ```bash
    pip install -r requirements.txt
    ```

## Usage
1. Start the Backend Server:
    ```bash
    cd server
    uvicorn main:app --reload
    ```

    The backend server will start on `http://127.0.0.1:8000`.

2. Start the Frontend Server:

    ```bash
    cd retool-app
    npm run dev
    ```

    The frontend application will start on `http://localhost:3000`.

3. Open your browser and navigate to http://localhost:3000. Enter a zip code to start scraping real estate listings from Realtor.com.

## API Endpoints
### GET `/scrape-realtor`

Scrapes real estate listings from Realtor.com based on the provided zip code.

- Parameters:
    `zip_code` (query parameter): The zip code to scrape listings for.
- Responses:
    - `200 OK`: Returns streaming updates of the scraping progress and the final listings.
    - `400 Bad Request`: Invalid zip code.
    - `500 Internal Server Error`: Failed to fetch listings.

- Example request:
    ```bash
    GET http://127.0.0.1:8000/scrape-realtor?zip_code=12345
    ```