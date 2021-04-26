const fs = require("fs");
const path = require("path");

const { getHtml, saveHtml } = require("../scraper/getter");
const { nextPage, movieParser } = require("../scraper/parser");

const getMovies = async (moviesPath) => {
  const movies = [];
  const rootUrl = "https://www.imdb.com";
  let top1000page = "/search/title/?groups=top_1000&sort=user_rating&count=250";
  for (let i = 0; i < 4; i++) {
    let htmlPath = path.join(global.APP_ROOT, `html/scrape_${i}.html`);
    let html;
    if (fs.existsSync(htmlPath)) {
      html = fs.readFileSync(htmlPath);
    } else {
      html = await getHtml(`${rootUrl}${top1000page}`);
      saveHtml(html, htmlPath);
    }
    top1000page = nextPage(html);
    const newMovies = movieParser(html);
    movies.push(...newMovies);
  }
  const data = JSON.stringify(movies);
  fs.writeFileSync(moviesPath, data);
  return movies;
};

module.exports = {
  getMovies,
};
