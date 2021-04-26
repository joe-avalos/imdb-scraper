# IMDB-SCRAPER
IMDB Top 1000 scraper and search api

### Running project

1. Clone project with<br>
   ``git clone https://github.com/joe-avalos/imdb-scraper.git``
2. Run project (in project root)
    1. Run with Docker<br>
        ``docker compose up``<br>
   2. Run locally <br>
        ``npm install``<br>
        ``npm run start``<br>
  
3. Send ``GET`` requests to endpoints
    1. First endpoint to start the scrape and create local data
        >http://localhost:3420/imdb-scraper/data-scrape
   2. Search endpoint with query params
        >http://localhost:3420/imdb-scraper/search?term=nolan%20hardy