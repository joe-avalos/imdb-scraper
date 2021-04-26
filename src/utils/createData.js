const fs = require("fs");
const path = require("path");

const { getMovies } = require("./getMovies");
const { getPeople } = require("./getPeople");
const { getSearchTerms } = require("./getSearchTerms");

const createData = async () => {
  const moviesPath = path.join(global.APP_ROOT, "data/movies.json");
  const peoplePath = path.join(global.APP_ROOT, "data/people.json");
  let movies = [];
  if (fs.existsSync(moviesPath)) {
    const raw = fs.readFileSync(moviesPath);
    movies = JSON.parse(raw);
  }
  if (movies.length !== 1000) {
    movies = await getMovies(moviesPath);
  }
  const people = getPeople(movies, peoplePath);
  getSearchTerms(movies, people);
};

module.exports = {
  createData,
};
